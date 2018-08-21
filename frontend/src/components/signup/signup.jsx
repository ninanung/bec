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

    onSignup = () => {
        if(checkBetween(this.state.id, 5, 12)) {

        }
    }

    render() {
        return (
            <div>
                <IntroHeader/>
                <div className='signup'>
                    <div className='signup-header'>
                        
                    </div>
                    <div className='signup-body'>
                        <InputBox typeChange={this.onIdChange} placeholder='ID' width={this.state.inputWidth} height={this.state.inputHeight} />
                        <br/>
                        <InputBox typeChange={this.onPasswordChange} placeholder='Password' width={this.state.inputWidth} height={this.state.inputHeight} />
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