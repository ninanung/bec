import React, { Component } from 'react';

import MailItem from './mail_item/mail_item';

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
                {this.listMails(this.state.mails)}
            </div>
        )
    }
}

export default HomeBodyMails;