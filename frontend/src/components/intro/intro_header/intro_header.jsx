import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import bec from '../../../assets/logo.png';

import './intro_header.css';

class IntroHeader extends Component {
    render() {
        return (
            <div className='intro-header'>
                <Link className='intro-title-link' to='/'><img className="intro-title" alt='bec' src={bec} /></Link>
                <h2 className='intro-subtitle'>better e-mail client</h2>
            </div>
        );
    }
}

export default IntroHeader;