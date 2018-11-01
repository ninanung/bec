import React, { Component } from 'react';
import { checkNumber } from 'sign-checker/check';

import IntroHeader from '../intro/intro_header/intro_header';
import InputBox from '../input_box/input_box';
import SelectBox from '../select_box/select_box';

import './signup_smtp.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_smtp: state.signup_smtp,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_smtp: actions.store_signup_smtp,
        clear_signup_basic: actions.clear_signup_basic,
        clear_signup_smtp: actions.clear_signup_smtp,
    }, dispatch)
}

class SignupSmtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            host: '',
            port: '',
            secure: true,
        }
    }

    componentWillMount = () => {
        this.props.clear_signup_smtp();
        if(!this.props.signup_basic.id || !this.props.signup_basic.password) {
            alert('You have to write basic information first.')
            this.props.history.push('/signup');
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

    onSecureChange = (event) => {
        let secure;
        if(event.target.value === 'true') secure = true;
        else secure = false;
        this.setState({secure: secure});
    }

    clearState = () => {
        this.props.clear_signup_basic();
        this.props.clear_signup_smtp();
    }

    onCancel = () => {
        this.clearState();
        this.props.history.push('/signup')
    }

    onSignup = () => {
        const {id, password, host, port, secure} = this.state;
        if(!id || !password || !host || !port || !secure) return alert('All information must be fullfilled.');
        for(let i = 0; i < port.length; i++) {
            if(!checkNumber(port[i])) return alert('Port must be number.');
        }
        const info = {
            smtp_id: id,
            smtp_password: password,
            smtp_host: host,
            smtp_port: port,
            smtp_secure: true,
        }
        this.props.store_signup_smtp(info);
        this.props.history.push('/signup/imap')
    }

    render() {
        const inputWidth = 350;
        const inputHeight = 30;
        const options = ['true', 'false'];
        return (
            <div>
                <IntroHeader/>
                <div className='signup-smtp'>
                    <div className='signup-smtp-header'>
                        <h1>Email Smtp setting</h1>
                        <p className='signup-smtp-notice'>You must confirm all informations are right. If not, you can't send any email.</p>
                    </div>
                    <div className='signup-smtp-body'>
                        <label>Original account ID.</label>
                        <br/>
                        <InputBox typeChange={this.onIdChange} placeholder='Email Account ID' width={200} height={inputHeight} />
                        <p className='br'/>
                        <label>Original account password.</label>
                        <br/>
                        <InputBox type="password" typeChange={this.onPasswordChange} placeholder='Email Account Password' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>Smtp host url. (example: smtp.gmail.com)</label>
                        <br/>
                        <InputBox typeChange={this.onHostChange} placeholder='Smtp Host' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>Smtp host's port, normally port is 4 digits of number.</label>
                        <br/>
                        <InputBox typeChange={this.onPortChange} placeholder='Smtp Port' width={100} height={inputHeight} />
                        <p className='br'/>
                        <label>Option about smtp's secure setting. normally true.</label>
                        <br/>
                        <SelectBox options={options} optionChange={this.onSecureChange} />
                        <p className='br'/>
                    </div>
                    <div className='signup-smtp-footer'>
                        <button onClick={this.onCancel} className='button signup-smtp-cancel'>◀ Back</button>
                        <button onClick={this.onSignup} className='button signup-smtp-next'>Next ▶</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupSmtp);