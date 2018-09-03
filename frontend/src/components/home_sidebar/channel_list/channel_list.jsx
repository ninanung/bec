import React, { Component } from 'react';

import ChannelItem from './channel_item/channel_item';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
        }
    }

    componentWillMount() {
        //connect to server and get emails
        const mails = [];
        this.setState({
            mails: mails,
        })
    }

    listMails = (mails) => {
        mails.map((mail, index) => {
            return (
                <ChannelItem mail={mail} index={index} key={index} />
            )
        })
    }

    render() {
        return (
            <div className='channel-list-body'>
                {this.listMails(this.state.mails)}
            </div>
        )
    }
}

export default ChannelList;