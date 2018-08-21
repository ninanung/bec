import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './intro_header.css';

class IntroHeader extends Component {
    render() {
        return (
            <div className='intro-header'>
                <h1 className='intro-title'><Link className='intro-title-link' to='/'>Bec</Link></h1>
                <h2 className='intro-subtitle'>better e-mail client</h2>
            </div>
        );
    }
}

export default IntroHeader;