import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'request';

import InputBox from '../input_box/input_box';
import ModalLoader from '../modal_loader/modal_loader';

import './signin.css';
import constant from '../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clear_signup_imap: actions.clear_signup_imap,
        clear_signup_basic: actions.clear_signup_basic,
        clear_signup_smtp: actions.clear_signup_smtp,
        empty_channels: actions.empty_channels,
        make_signout: actions.make_signout,

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
            loading: false,
        }
    }

    onIdChange = (event) => {
        this.setState({id: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    startLoad = () => {
        this.setState({
            loading: true,
        })
    }

    endLoad = () => {
        this.setState({
            loading: false,
        })
    }

    connectImap = (imap_info) => {
        const {clear_signup_basic, clear_signup_imap, clear_signup_smtp, make_signout, empty_channels} = this.props;
        const option = {
            method: 'POST',
            url: constant.CONNECT_IMAP,
            json: {
                imap_info: imap_info,
            },
        }
        request(option, function(err, res, body) {
            if(err) {
                alert(err);
                clear_signup_basic();
                clear_signup_imap();
                clear_signup_smtp();
                make_signout();
                empty_channels();
                return window.location.href = '/';
            } else if(body) {
                return window.location.href = '/home';
            }
        });
    }

    storeAll = (basic_info, imap_info, smtp_info, channels) => {
        const {store_signup_basic, store_signup_imap, store_signup_smtp, insert_channels, make_signin} = this.props;
        store_signup_basic(basic_info);
        store_signup_imap(imap_info);
        store_signup_smtp(smtp_info);
        insert_channels(channels);
        make_signin();
    }

    onSignin = () => {
        if(!this.state.id || !this.state.password) {
            return alert('Please, fulfill all user information.')
        }
        const signinInfo = {
            id: this.state.id,
            password: this.state.password,
        }
        let option = {
            method: 'POST',
            url: constant.SIGNIN,
            json: signinInfo,
        }
        //base state
        let basic_info = null;
        let smtp_info = null;
        let imap_info = null;
        let channels = null;

        //prepare functions for using in the request
        const storeAll = this.storeAll;
        const connectImap = this.connectImap;
        const startLoad = this.startLoad;

        request(option, function(err, res, body) {
            if(err) {
                return alert(err);
            } else if(body.error) {
                return alert(body.error);
            } else {
                basic_info = {
                    id: body.user.id,
                    password: body.user.password,
                };
                smtp_info = {
                    smtp_id: body.user.smtp_id,
                    smtp_password: body.user.smtp_password,
                    smtp_host: body.user.smtp_host,
                    smtp_port: body.user.smtp_port,
                    smtp_secure: body.user.smtp_secure,
                };
                imap_info = {
                    imap_id: body.user.imap_id,
                    imap_password: body.user.imap_password,
                    imap_host: body.user.imap_host,
                    imap_port: body.user.imap_port,
                    imap_tls: body.user.imap_tls,
                };
                channels = body.user.channels;
                storeAll(basic_info, imap_info, smtp_info, channels);
                startLoad();
                connectImap(imap_info);
            }
        });
    }

    render() {
        return (
            <div className='signin'>
                {this.state.loading ? <ModalLoader /> : null}
                <div className='signin-header'>
                    <h1 className='signin-header-title'>wellcome Bec!</h1>
                    <p className='signin-header-text'>For the better e-mail user experience</p>
                    <p className='signin-header-text'>Organize users and mails.</p>
                </div>
                <div className='signin-body'>
                    <InputBox typeChange={this.onIdChange} placeholder='ID' width={this.state.inputWidth} height={this.state.inputHeight} />
                    <br/>
                    <InputBox typeChange={this.onPasswordChange} placeholder='Password' type='password' width={this.state.inputWidth} height={this.state.inputHeight} />
                    <button onClick={this.onSignin} className='button'>Sign in</button>
                </div>
                <div className='signin-footer'>
                    <p>You don't have any account? <Link to='/signup'>Create one</Link></p>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);