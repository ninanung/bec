import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChannelItem from './channel_item/channel_item';
import './channel_list.css';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        const channels = nextProps.channels;
        this.setState({
            channels: channels,
        })
    }

    componentWillMount() {
        const channels = this.props.channels;
        this.setState({
            channels: channels,
        })
    }

    render() {
        return (
            <div className='channel-list-body'>
                <h2 className='channel-list-h2'>Channels</h2>
                <channelItem isChannel={false} history={this.props.history} channel={{ name: 'Home', address: '/'}} />
                {this.state.channels.map((channel, index) => {
                    return <ChannelItem isChannel={true} history={this.props.history} channel={channel} index={index} key={index} />
                })}
                <h2 className='channel-list-h2'>Mail Boxes</h2>
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'Unread', address: 'unread' }} />
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'All', address: 'all' }} />
                <ChannelItem isChannel={false} history={this.props.history} channel={{ name: 'Sent', address: 'sent' }} />
            </div>
        )
    }
}

ChannelList.propTypes = {
    channels: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired,
}

export default ChannelList;