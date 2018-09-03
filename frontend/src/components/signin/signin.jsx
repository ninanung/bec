import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputBox from '../input_box/input_box';

import './signin.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_imap: actions.store_signup_imap,
        store_signup_basic: actions.store_signup_basic,
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
        //send data to server
        const basic_info = null;
        const imap_info = null;
        this.props.store_signup_basic(basic_info);
        this.props.store_signup_imap(imap_info);
        this.props.history.push('/home');
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