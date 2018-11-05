import React, { Component } from 'react';
import { checkWhiteSpace, checkLanguageEnglish, checkLongerThan } from 'sign-checker/check';
import request from 'request';

import InputBox from '../../../input_box/input_box'

import constant from '../../../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_basic: actions.store_signup_basic,
    }, dispatch)
}

class EditBasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWidth: 350,
            inputHeight: 30,
            passwordNoti: '',
            password: '',
            address: '',
            name: '',
            confirmPassword: '',
        }
    }

    componentWillMount = () => {
        const signup_basic = this.props.signup_basic;
        this.setState({
            address: signup_basic.address,
            name: signup_basic.name,
            password: signup_basic.password,
        }) 
    }

    checkPasswordGood = (password, confirmPassword) => {
        if(!password || !confirmPassword || !checkLongerThan(password, 5) || !checkLanguageEnglish(password) || checkWhiteSpace(password) || password !== confirmPassword) {
            this.setState({passwordNoti: 'NotGood'});
        } else this.setState({passwordNoti: 'Good'});
    }

    onPasswordChange = (event) => {
        const password = event.target.value;
        const confirmPassword = this.state.confirmPassword;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({password: password});
    }

    onAddressChange = (event) => {
        const address = event.target.value;
        this.setState({address: address});
    }

    onNameChange = (event) => {
        const name = event.target.value;
        this.setState({name: name});
    }

    onConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        const password = this.state.password;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({confirmPassword: event.target.value});
    }

    onEditBasicInfo = () => {
        const {store_signup_basic, signup_basic} = this.props;
        const {password, address, name, confirmPassword} = this.state;
        if(!password || !address || !name || !confirmPassword) return alert('All information must be fullfilled.');
        if(checkWhiteSpace(address+password+confirmPassword)) return alert('White space are not allowed.');
        if(!checkLanguageEnglish(address+password+confirmPassword)) return alert('All information must be made with English language.');
        if(!checkLongerThan(password, 5)) return alert('Password must be longer than 5 letters.')
        if(password !== confirmPassword) return alert('Password and repeated password are not matched.');
        const info = {
            settingType: 'basic',
            basic_id: signup_basic.id,
            password: password,
            address: address,
            name: name,
        };
        const option = {
            method: 'POST',
            url: constant.UPDATE_USER,
            json: info,
        }
        request(option, (err, res, body) => {
            if(err) throw err;
            if(body.error) throw body.error;
            else return body.info;
        }).then((info) => {
            const basic_info = {
                id: signup_basic.id,
                password: info.password,
                address: info.password,
                name: info.name,
            }
            store_signup_basic(basic_info);
        }).catch((err) => {
            return alert(err);
        })
    }

    render() {
        const {passwordNoti, inputHeight, inputWidth} = this.state;
        const {signup_basic} = this.props;
        return (
            <div>
                <div className='signup'>
                    <div className='signup-header'>
                        <h1>Basic information</h1>
                    </div>
                    <div className='signup-body'>
                        <p>User can't change their own ID, cause that is required to identify.</p>
                        <br/>
                        <label>Address must be your mail address in SMTP server.</label>
                        <InputBox value={signup_basic.address} typeChange={this.onAddressChange} placeholder='Address' width={inputWidth} height={inputHeight} />
                        <br/>
                        <br/>
                        <label>Name that will used for email sending.</label>
                        <InputBox value={signup_basic.name} typeChange={this.onNameChange} placeholder='Name' width={inputWidth} height={inputHeight} />
                        <br/>
                        <br/>
                        <label>Password must be longer than 6 and combination of English, special letters and number.</label>
                        <InputBox value={signup_basic.password} type='password' typeChange={this.onPasswordChange} placeholder='Password' width={inputWidth} height={inputHeight} />
                        <br/>
                        <InputBox value={signup_basic.password} type='password' typeChange={this.onConfirmPasswordChange} placeholder='Repeat Password' width={inputWidth} height={inputHeight} />
                        <p className={passwordNoti}>{passwordNoti}</p>
                        <br/>
                    </div>
                    <div className='signup-footer'>
                        <button onClick={this.onEditBasicInfo} className='button signup-next'>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBasicInfo);