import React, { Component } from 'react';

import MailItem from './mail_item/mail_item';

import './home_body_mails.css';

/*import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
    }
}*/

class HomeBodyMails extends Component {
    render() {
        return (
            <div className='mails-body'>
                {this.props.mails.map((mail, index) => {
                    if(mail.sent) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                        )
                    } else {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                        )
                    }
                })}  
            </div>
        )
    }
}

export default HomeBodyMails;