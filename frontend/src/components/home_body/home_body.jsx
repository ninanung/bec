import React, { Component } from 'react';

import TextField from './text_field/text_field';
import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';

import './home_body.css';

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }

    menuIconClick = () => {
        //menu
    }

    mailboxIconClick = () => {
        //mailbox
    }

    render() {
        return (
            <div className='home-body-main'>
                <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                <HomeBodyMails address={this.props.address} history={this.props.history} />
                <TextField history={this.props.history} />
            </div>
        )
    }
}

export default HomeBody;