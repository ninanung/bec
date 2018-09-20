import React, { Component } from 'react';

import ChannelItem from './channel_item/channel_item';
import './channel_list.css';

const testList = [
    {
        name: 'kim',
        address: 'ninanung@naver.com'
    },
    {
        name: 'park',
        address: 'slskshdsl@daum.net'
    },
    {
        name: 'song',
        address: 'songbird@gmail.com'
    }
]

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
        }
    }

    componentWillMount() {
        const channels = testList; //this.props.channels;
        this.setState({
            channels: channels,
        })
    }

    render() {
        return (
            <div className='channel-list-body'>
                <h2 className='channel-list-h2'>Channels</h2>
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'Channel Home', address: '' }} />
                {this.state.channels.map((channel, index) => {
                    return (
                        <ChannelItem isChannel={true} history={this.props.history} channel={channel} index={index} key={index} />
                    )
                })}
                <h2 className='channel-list-h2'>Mail Boxes</h2>
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'Unread', address: 'mailbox/unread' }} />
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'All', address: 'mailbox/all' }} />
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'Sent', address: 'mailbox/sent' }} />
            </div>
        )
    }
}

export default ChannelList;