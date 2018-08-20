import React, { Component } from 'react';

import Signin from '../signin/signin.js';
import IntroSample from './intro_sample/intro_sample.js';

import './intro.css';

class Intro extends Component {
    render() {
        return (
            <div className="intro">
                <header className="intro-header">
                    <h1 className="intro-title">Bec</h1>
                    <h2 className="intro-subtitle">better e-mail client</h2>
                </header>
                <div className="intro-body">
                    <Signin/>
                    <hr/>
                    <IntroSample/>
                    <hr/>
                </div>
            </div>
        );
    }
}

export default Intro;