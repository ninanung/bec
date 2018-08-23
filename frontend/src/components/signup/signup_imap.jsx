import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkBetween } from 'sign-checker';

import IntroHeader from '../intro/intro_header/intro_header';
import InputBox from '../input_box/input_box'

import './signup_imap.css';

class SignupImap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWidth: 350,
            inputHeight: 30,
            id: '',
            password: '',
            host: '',
            port: '',
            tls: false,
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

    onCreateAccount = () => {
        if(checkBetween(this.state.id, 5, 12)) {
            console.log("?")
            
        }
    }

    render() {
        return (
            <div>
                <IntroHeader/>
                <div className='signup-imap'>
                    <div className='signup-imap-header'>
                        <h1>Basic information</h1>
                    </div>
                    <div className='signup-imap-body'>
                        <InputBox typeChange={this.onIdChange} placeholder='ID' width={200} height={this.state.inputHeight} />
                        <br/>
                        <InputBox type="password" typeChange={this.onPasswordChange} placeholder='Password' width={this.state.inputWidth} height={this.state.inputHeight} />
                        <br/>
                        <InputBox typeChange={this.HostChange} placeholder='Repeat Password' width={this.state.inputWidth} height={this.state.inputHeight} />
                        <br/>
                    </div>
                    <div className='signup-imap-footer'>
                        <Link to='/signup'><button className='button signup-imap-cancel'>◀ Back</button></Link>
                        <button onClick={this.onCreateAccount} className='button signup-imap-next'>Create ▶</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupImap;