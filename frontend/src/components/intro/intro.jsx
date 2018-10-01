import React, { Component } from 'react';

import Signin from '../signin/signin';
import IntroSample from './intro_body/intro_sample';
import IntroHeader from './intro_header/intro_header';
import IntroImap from './intro_body/intro_imap';

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