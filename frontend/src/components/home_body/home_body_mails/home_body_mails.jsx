import React, { Component } from 'react';

import MailItem from './mail_item/mail_item';

import './home_body_mails.css';

class HomeBodyMails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
        }
    }

    componentWillMount() {
        //get mails from  server
        const mails = [];
        this.setState({
            mails: mails,
        })
    }

    listMails = (mails) => {
        mails.map((mail, index)=> {
            return (
                <MailItem mail={mail} index={index} key={index} />
            )
        })
    }

    render() {
        return (
            <div className='mails-body'>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
            </div>
        )
    }
}

export default HomeBodyMails;