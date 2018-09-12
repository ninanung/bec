import React, { Component } from 'react';

import Signin from '../signin/signin';
import IntroSample from './intro_body/intro_sample';
import IntroHeader from './intro_header/intro_header';
import IntroImap from './intro_body/intro_imap';

import './intro.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        signup_smtp: state.signup_smtp,
    }
}

class Intro extends Component {
    componentWillMount = () => {
        const { signup_basic, signup_imap, history, signup_smtp } = this.props;
        if(signup_basic.id && signup_basic.password && signup_imap.imap_id && signup_imap.imap_password && 
            signup_imap.imap_host && signup_imap.imap_port && signup_smtp.smtp_id && signup_smtp.smtp_password) {
                history.push('/home');
        }
    }

    render() {
        return (
            <div className='header'>
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