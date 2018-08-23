import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkBetween } from 'sign-checker';

import IntroHeader from '../intro/intro_header/intro_header';
import InputBox from '../input_box/input_box'

import './signup.css';

class Signup extends Component {
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

    onIdChange = (event) => {
        this.setState({id: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onConfirmPasswordChange = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    onSignup = () => {
        if(checkBetween(this.state.id, 5, 12)) {
            this.props.history.push('/signup/imap')
        }
    }

    render() {
        return (
            <div>
                <IntroHeader/>
                <div className='signup'>
                    <div className='signup-header'>
                        <h1>Basic information</h1>
                    </div>
                    <div className='signup-body'>
                        <label>ID must be 6~11 letters and English.</label>
                        <InputBox typeChange={this.onIdChange} placeholder='ID' width={200} height={this.state.inputHeight} />
                        <p>{this.state.idNoti}</p>
                        <br/>
                        <label>Password must be combination of English and number.</label>
                        <InputBox type="password" typeChange={this.onPasswordChange} placeholder='Password' width={this.state.inputWidth} height={this.state.inputHeight} />
                        <br/>
                        <InputBox type="password" typeChange={this.onConfirmPasswordChange} placeholder='Repeat Password' width={this.state.inputWidth} height={this.state.inputHeight} />
                        <p>{this.state.passwordNoti}</p>
                        <br/>
                    </div>
                    <div className='signup-footer'>
                        <Link to='/'><button className='button signup-cancel'>◀ Cancel</button></Link>
                        <button onClick={this.onSignup} className='button signup-next'>Next ▶</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;