import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteChannelList from '../../../delete_channel_button/delete_channel_button';

import './channel_item.css';

class ChannelItem extends Component {
    clickListItem = () => {
        const {isChannel, history, channel} = this.props;
        if(!isChannel && channel.address) {
            history.push('/home/mailbox/' + channel.address);
        } else if(!channel.address) { 
            history.push('/home');
        } else {
            history.push('/home/' + channel.address);
        }
    }

    render() {
        const {isChannel, channel} = this.props;
        return (
            <div onClick={this.clickListItem} className='channel-item-body'>
                <div className='channel-item-name'>
                    <h3>✔ {channel.name + ' '} {isChannel ? <DeleteChannelList address={channel.address} /> : null}</h3>
                </div>
                <div className='channel-item-address'>
                    {isChannel ? channel.address : ''} 
                </div>
            </div>
        )
    }
}

ChannelItem.propTypes = {
    channel: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    index: PropTypes.number,
    isChannel: PropTypes.bool.isRequired,
}

export default ChannelItem