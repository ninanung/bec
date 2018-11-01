import React, { Component } from 'react';
import { checkNumber } from 'sign-checker/check';
import request from 'request';

import IntroHeader from '../intro/intro_header/intro_header';
import InputBox from '../input_box/input_box';
import SelectBox from '../select_box/select_box';

import constant from '../../constant/server_constant';
import './signup_imap.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_smtp: state.signup_smtp,
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clear_signup_basic: actions.clear_signup_basic,
        clear_signup_smtp: actions.clear_signup_smtp,
        clear_signup_imap: actions.clear_signup_imap,
    }, dispatch)
}

class SignupImap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            host: '',
            port: '',
            tls: true,
        }
    }

    componentWillMount = () => {
        this.props.clear_signup_imap();
        if(!this.props.signup_basic.id || !this.props.signup_basic.password) {
            alert('You have to write basic information first.')
            return this.props.history.push('/signup');
        }
        if(!this.props.signup_smtp.smtp_id || !this.props.signup_smtp.smtp_password) {
            alert('You have to write SMTP server information first.')
            return this.props.history.push('/signup/smtp');
        }
    }

    onIdChange = (event) => {
        this.setState({id: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onHostChange = (event) => {
        this.setState({host: event.target.value});
    }

    onPortChange = (event) => {
        this.setState({port: event.target.value});
    }

    onTlsChange = (event) => {
        let tls;
        if(event.target.value === 'true') tls = true;
        else tls = false;
        this.setState({tls: tls});
    }

    clearState = () => {
        this.props.clear_signup_basic();
        this.props.clear_signup_smtp();
        this.props.clear_signup_imap();
    }

    onCancel = () => {
        this.props.clear_signup_smtp();
        this.props.history.push('/signup/smtp');
    }

    onCreateAccount = () => {
        const {id, password, host, port, tls} = this.state;
        const { signup_basic, signup_smtp } = this.props;
        if(!id || !password || !host || !port || !tls) return alert('All information must be fullfilled.');
        for(let i = 0; i < port.length; i++) {
            if(!checkNumber(port[i])) return alert('Port must be number.');
        }
        const signupInfo = {
            id: signup_basic.id,
            password: signup_basic.password,
            address: signup_basic.address,
            name: signup_basic.name,
            imap_id: id,
            imap_password: password,
            imap_host: host,
            imap_port: port,
            imap_tls: tls,
            smtp_id: signup_smtp.smtp_id,
            smtp_password: signup_smtp.smtp_password,
            smtp_host: signup_smtp.smtp_host,
            smtp_port: signup_smtp.smtp_port,
            smtp_secure: signup_smtp.smtp_secure,
        }
        const option = {
            method: 'POST',
            uri: constant.SIGNUP,
            json: signupInfo,
        }
        const clearState = this.clearState
        request(option, (err, res, body) => {
            if(err) return alert(err);
            if(body.error) return alert(body.error);
            else {
                alert('Signup is done, please signin!');
                clearState();
                return this.props.history.push('/')
            }
        })
    }

    render() {
        const inputWidth = 350;
        const inputHeight = 30;
        const options = ['true', 'false'];

        return (
            <div>
                <IntroHeader/>
                <div className='signup-imap'>
                    <div className='signup-imap-header'>
                        <h1>Email Imap setting</h1>
                        <p className='signup-imap-notice'>You must confirm all informations are right. If not, you can't get any email from original account.</p>
                    </div>
                    <div className='signup-imap-body'>
                        <label>Original account ID.</label>
                        <br/>
                        <InputBox typeChange={this.onIdChange} placeholder='Email Account ID' width={200} height={inputHeight} />
                        <p className='br'/>
                        <label>Original account password.</label>
                        <br/>
                        <InputBox type="password" typeChange={this.onPasswordChange} placeholder='Email Account Password' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>Imap host url. (example: imap.gmail.com)</label>
                        <br/>
                        <InputBox typeChange={this.onHostChange} placeholder='Imap Host' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>Imap host's port, normally port is 4 digits of number.</label>
                        <br/>
                        <InputBox typeChange={this.onPortChange} placeholder='Imap Port' width={100} height={inputHeight} />
                        <p className='br'/>
                        <label>Option about imap's TLS setting. normally true.</label>
                        <br/>
                        <SelectBox options={options} optionChange={this.onTlsChange} />
                        <p className='br'/>
                    </div>
                    <div className='signup-imap-footer'>
                        <button onClick={this.onCancel} className='button signup-imap-cancel'>◀ Back</button>
                        <button onClick={this.onCreateAccount} className='button signup-imap-next'>Create ▶</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupImap);