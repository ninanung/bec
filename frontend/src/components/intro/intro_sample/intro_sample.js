import React, { Component } from 'react';

import sample from '../../../assets/sample_page.png';

import './intro_sample.css';

class IntroSample extends Component {
    render() {
        return (
            <div className="intro-sample">
                <h1 className="intro-sample-head">What is Bec?</h1>
                <img className="intro-sample-image" src={sample}/>
                <p className="intro-sample-text">Chat-like e-mail client</p>
                <p className="intro-sample-text">Easy sending, Easy receiving</p>
                <br/>
            </div>
        );
    }
}

export default IntroSample;