import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './mail_item.css';

import PopupMail from '../../../popup_mail/popup_mail';
import InsertChannelButton from '../../../insert_channel_button/insert_channel_button';

class MailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }

    closePopup = () => {
        this.setState({
            popup: false,
        })
    }

    onPopup = () => {
        this.setState({
            popup: true,
        })
    }

    onEscClose = (event) => {
        console.log(event.keyCode)
        if(event.keyCode && event.keyCode === 27) {
            this.setState({
                popup: false,
            })
        }
    }

    render() {
        const { mail, sent } = this.props;
        const { popup } = this.state;
        let whoSent = '';
        if(sent) {
            whoSent = 'mail-item-me'
        } else if(this.props.mailbox) {
            whoSent = 'mail-item-mailbox'
        } else {
            whoSent = 'mail-item-other'
        }
        if(this.props.unseen) {
            whoSent += ' unseen'
        }
        return (
            <div className={whoSent}>
                <div onClick={this.onPopup}>
                    <h2 className='mail-item-text'>{'Sub: ' + mail.subject}</h2>
                    <h3 className='mail-item-text'><InsertChannelButton address={mail.from} />{'From: ' + mail.from}</h3>
                    <h3 className='mail-item-text'>{'Text: ' + mail.text}</h3>
                </div>
                {popup ? <PopupMail mail={mail} onEscClose={this.onEscClose} closePopup={this.closePopup} /> : null}
            </div>
        )
    }
}

MailItem.propTypes = {
    mail: PropTypes.object,
    index: PropTypes.number,
}

export default MailItem;