import React, { Component } from 'react';

import gmail from '../../../assets/gmail.png';
import hotmail from '../../../assets/hotmail.png';
import yahoo from '../../../assets/yahoo.png';

import './intro_imap.css';

class IntroImap extends Component {
    render() {
        return (
            <div className='intro-imap'>
                <h1 className='intro-imap-head'>New email?</h1>
                <img alt="gmail" className='intro-imap-image gmail' src={gmail}></img>
                <img alt="hotmail" className='intro-imap-image hotmail' src={hotmail}></img>
                <img alt="yahoo mail" className='intro-imap-image yahoo' src={yahoo}></img>
                <p className='intro-imap-text'>Never, Bec is not a email domain.</p>
                <p className='intro-imap-text'>Use your email as before, just with amazing UI.</p>
                <br/>
            </div>
        );
    }
}

export default IntroImap;