import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkBetween, checkWhiteSpace, checkLanguageEnglish, checkLongerThan } from 'sign-checker';

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

    checkPasswordGood = (password, confirmPassword) => {
        if(!password || !confirmPassword || !checkLongerThan(password, 5) || !checkLanguageEnglish(password) || checkWhiteSpace(password) || password !== confirmPassword) {
            this.setState({passwordNoti: 'NotGood'});
        } else {
            this.setState({passwordNoti: 'Good'});
        }
    }

    onIdChange = (event) => {
        const id = event.target.value;
        if(!checkBetween(id, 5, 12) || !checkLanguageEnglish(id) || checkWhiteSpace(id)) {
            this.setState({idNoti: 'NotGood'});
        } else {
            this.setState({idNoti: 'Good'});
        }
        this.setState({id: id});
    }

    onPasswordChange = (event) => {
        const password = event.target.value;
        const confirmPassword = this.state.confirmPassword;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({password: password});
    }

    onConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        const password = this.state.password;
        this.checkPasswordGood(password, confirmPassword);
        this.setState({confirmPassword: event.target.value});
    }

    onSignup = () => {
        const {history} = this.props;
        const {id, password, confirmPassword} = this.state;
        if(!id || !password || !confirmPassword) {
            return alert('All information must be fullfilled.');
        }
        if(checkWhiteSpace(id+password+confirmPassword)) {
            return alert('White space are not allowed.');
        }
        if(!checkBetween(id, 5, 12)) {
            return alert('ID must be 6~11 long.');
        }
        if(!checkLanguageEnglish(id+password+confirmPassword)) {
            return alert('All information must be made with English language.');
        }
        if(password !== confirmPassword) {
            return alert('Password and repeated password are not matched.');
        }
        history.push('/signup/imap');
    }

    render() {
        const {idNoti, passwordNoti, inputHeight, inputWidth} = this.state;
        return (
            <div>
                <IntroHeader/>
                <div className='signup'>
                    <div className='signup-header'>
                        <h1>Basic information</h1>
                    </div>
                    <div className='signup-body'>
                        <label>ID must be 6~11 long and can be made with English, special letters and number.</label>
                        <InputBox typeChange={this.onIdChange} placeholder='ID' width={200} height={inputHeight} />
                        <p className={idNoti}>{idNoti}</p>
                        <br/>
                        <label>Password must be longer than 6 and combination of English, special letters and number.</label>
                        <InputBox type='password' typeChange={this.onPasswordChange} placeholder='Password' width={inputWidth} height={inputHeight} />
                        <br/>
                        <InputBox type='password' typeChange={this.onConfirmPasswordChange} placeholder='Repeat Password' width={inputWidth} height={inputHeight} />
                        <p className={passwordNoti}>{passwordNoti}</p>
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