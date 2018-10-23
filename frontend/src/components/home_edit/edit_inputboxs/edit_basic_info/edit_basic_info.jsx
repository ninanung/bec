import React, { Component } from 'react';
import { checkBetween, checkWhiteSpace, checkLanguageEnglish, checkLongerThan } from 'sign-checker/check';
import request from 'request';

import InputBox from '../../../input_box/input_box'

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
            idNoti: '',
            passwordNoti: '',
            id: '',
            password: '',
            confirmPassword: '',
        }
    }

    componentWillMount = () => {
        this.setState({
            id: this.props.signup_basic.id,
            password: this.props.signup_basic.password,
        }) 
    }

    checkPasswordGood = (password, confirmPassword) => {
        if(!password || !confirmPassword || !checkLongerThan(password, 5) || !checkLanguageEnglish(password) || checkWhiteSpace(password) || password !== confirmPassword) {
            this.setState({passwordNoti: 'NotGood'});
        } else {
            this.setState({passwordNoti: 'Good'});
        }
    }

    onIdChange = (event) => {
        const id = event.target.value;
        if(!checkBetween(id, 5, 12) || !checkLanguageEnglish(id) || checkWhiteSpace(id)) {
            this.setState({idNoti: 'NotGood'});
        } else {
            this.setState({idNoti: 'Good'});
        }
        this.setState({id: id});
    }

    onPasswordChange = (event) => {
        const password = event.target.value;
        const confirmPassword = this.state.confirmPassword;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({password: password});
    }

    onConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        const password = this.state.password;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({confirmPassword: event.target.value});
    }

    onEditBasicInfo = () => {
        const {history} = this.props;
        const {id, password, confirmPassword} = this.state;
        if(!id || !password || !confirmPassword) {
            return alert('All information must be fullfilled.');
        }
        if(checkWhiteSpace(id+password+confirmPassword)) {
            return alert('White space are not allowed.');
        }
        if(!checkBetween(id, 5, 12)) {
            return alert('ID must be 6~11 long.');
        }
        if(!checkLanguageEnglish(id+password+confirmPassword)) {
            return alert('All information must be made with English language.');
        }
        if(!checkLongerThan(password, 5)) {
            return alert('Password must be longer than 5 letters.')
        }
        if(password !== confirmPassword) {
            return alert('Password and repeated password are not matched.');
        }
        const info = {
            id: id,
            password: password
        };
        //request to server and save state
    }

    render() {
        const {idNoti, passwordNoti, inputHeight, inputWidth} = this.state;
        return (
            <div>
                <div className='signup'>
                    <div className='signup-header'>
                        <h1>Basic information</h1>
                    </div>
                    <div className='signup-body'>
                        <label>ID must be 6~11 long and can be made with English, special letters and number.</label>
                        <InputBox typeChange={this.onIdChange} placeholder='ID' width={200} height={inputHeight} />
                        <p className={idNoti}>{idNoti}</p>
                        <br/>
                        <label>Password must be longer than 6 and combination of English, special letters and number.</label>
                        <InputBox type='password' typeChange={this.onPasswordChange} placeholder='Password' width={inputWidth} height={inputHeight} />
                        <br/>
                        <InputBox type='password' typeChange={this.onConfirmPasswordChange} placeholder='Repeat Password' width={inputWidth} height={inputHeight} />
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