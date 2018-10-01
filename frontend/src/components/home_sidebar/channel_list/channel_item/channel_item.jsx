import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './channel_item.css';

class ChannelItem extends Component {
    clickListItem = () => {
        if(!this.props.isChannel && this.props.channel.address) {
            this.props.history.push('/home/mailbox/' + this.props.channel.address);
        } else if(!this.props.channel.address) { 
            this.props.history.push('/home');
        } else {
            this.props.history.push('/home/' + this.props.channel.address);
        }
    }

    render() {
        return (
            <div onClick={this.clickListItem} className='channel-item-body'>
                <div className='channel-item-name'>
                    <h3>✔ {this.props.channel.name}</h3>
                </div>
                <div className='channel-item-address'>
                    {this.props.isChannel ? this.props.channel.address : ''}
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