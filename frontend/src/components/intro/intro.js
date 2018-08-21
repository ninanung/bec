import React, { Component } from 'react';

import Signin from '../signin/signin.js';
import IntroSample from './intro_body/intro_sample.js';
import IntroHeader from './intro_header/intro_header.js';
import IntroImap from './intro_body/intro_imap.js';

import './intro.css';

class Intro extends Component {
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

export default Intro;