import React, { Component } from 'react';

import ChannelItem from './channel_item/channel_item';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
        }
    }

    componentWillMount() {
        //connect to server and get emails
        const channels = [];
        this.setState({
            channels: channels,
        })
    }

    listChannels = (channels) => {
        channels.map((channel, index) => {
            return (
                <ChannelItem channel={channel} index={index} key={index} />
            )
        })
    }

    render() {
        return (
            <div className='channel-list-body'>
                {this.listChannels(this.state.channels)}
            </div>
        )
    }
}

export default ChannelList;