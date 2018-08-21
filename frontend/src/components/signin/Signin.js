import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputBox from '../input_box/input_box.js';

import './signin.css';

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
        //send data to server
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

export default Signin;