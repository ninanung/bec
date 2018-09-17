import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './channel_item.css';

class ChannelItem extends Component {
    clickListItem = () => {
        return this.props.history.push('/home/' + this.props.channel.address);
    }

    render() {
        return (
            <div onClick={this.clickListItem} className='channel-item-body'>
                <div className='channel-item-name'>
                    {this.props.channel.name}
                </div>
                <div className='channel-item-address'>
                    {this.props.channel.address}
                </div>
            </div>
        )
    }
}

ChannelItem.propTypes = {
    channel: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}

export default ChannelItem