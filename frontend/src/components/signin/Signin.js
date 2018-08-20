import React, { Component } from 'react';

import InputBox from '../input_box/input_box.js';

import './signin.css';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWidth: 350,
            inputHeight: 30,
        }
    }

    render() {
        return (
            <div className="signin">
                <div className="signin-header">
                    <h1 className="signin-header-title">wellcome Bec!</h1>
                    <p className="signin-header-text">For the better e-mail user experience</p>
                    <p className="signin-header-text">Organize users and mails.</p>
                </div>
                <div className="signin-body">
                    <form className="signin-form">
                        <InputBox placeholder="ID" width={this.state.inputWidth} height={this.state.inputHeight}/>
                        <br/>
                        <InputBox placeholder="Password" width={this.state.inputWidth} height={this.state.inputHeight}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;