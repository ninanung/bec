import React, { Component } from 'react';

import Signin from '../signin/signin';
import IntroSample from './intro_body/intro_sample';
import IntroHeader from './intro_header/intro_header';
import IntroImap from './intro_body/intro_imap';

import './intro.css';

import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        is_signin: state.is_signin,
        signup_basic: state.signup_basic,
        mails: state.mails,
    }
}

class Intro extends Component {
    render() {
        return (
            <div className='header'>
                {console.log(this.props.mails)}
                <div>
                    <IntroHeader/>
                </div>
                <div className='body'>
                    <Signin/>
                    <hr/>
                    <IntroSample/>
                    <hr/>
                    <IntroImap/>                
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Intro);