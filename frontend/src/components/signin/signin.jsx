import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'request';

import InputBox from '../input_box/input_box';

import './signin.css';
import constant from '../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_imap: actions.store_signup_imap,
        store_signup_basic: actions.store_signup_basic,
        store_signup_smtp: actions.store_signup_smtp,
        insert_channels: actions.insert_channels,
        make_signin: actions.make_signin,
    }, dispatch)
}

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWidth: 350,
            inputHeight: 30,
            id: '',
            password: '',
        }
    }

    onIdChange = (event) => {
        this.setState({id: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSignin = () => {
        if(!this.state.id || !this.state.password) {
            return alert('Please, fulfill all user information.')
        }
        const option = {
            method: 'GET',
            url: constant.SIGNIN,
            json: {
                id: this.state.id,
                password: this.state.password,
            },
        }
        let basic_info = null;
        let smtp_info = null;
        let imap_info = null;
        let channels = null;
        request(option, function(err, res, body) {
            if(err) {
                return alert(err);
            } else if(body.error) {
                return alert(body.error);
            } else {
                basic_info = {
                    id: body.id,
                    password: body.password,
                };
                smtp_info = {
                    smtp_id: body.smtp_id,
                    smtp_password: body.smtp_password,
                    smtp_host: body.smtp_host,
                    smtp_port: body.smtp_port,
                    smtp_secure: body.smtp_secure,
                };
                imap_info = {
                    imap_id: body.imap_id,
                    imap_password: body.imap_password,
                    imap_host: body.imap_host,
                    imap_port: body.imap_port,
                    imap_tls: body.imap_tls,
                };
                channels = body.channels;
            }
        });
        this.props.store_signup_basic(basic_info);
        this.props.store_signup_imap(imap_info);
        this.props.store_signup_smtp(smtp_info);
        this.props.insert_channels(channels);
        this.props.make_signin();
        return this.props.history.push('/home');
    }

    render() {
        return (
            <div className='signin'>
                <div className='signin-header'>
                    <h1 className='signin-header-title'>wellcome Bec!</h1>
                    <p className='signin-header-text'>For the better e-mail user experience</p>
                    <p className='signin-header-text'>Organize users and mails.</p>
                </div>
                <div className='signin-body'>
                    <InputBox typeChange={this.onIdChange} placeholder='ID' width={this.state.inputWidth} height={this.state.inputHeight} />
                    <br/>
                    <InputBox typeChange={this.onPasswordChange} placeholder='Password' width={this.state.inputWidth} height={this.state.inputHeight} />
                    <button onClick={this.onSignin} className='button'>Sign in</button>
                </div>
                <div className='signin-footer'>
                    <p>You don't have any account? <Link to='/signup'>Create one</Link></p>
                </div>
            </div>
        );
    }
}

export default connect(mapDispatchToProps)(Signin);