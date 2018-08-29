import React, { Component } from 'react';

import ChannelItem from './channel_item/channel_item';

class ChannelList extends Component {
    render() {
        return (
            <div className='channel-list-body'>
                <ChannelItem />
            </div>
        )
    }
}

export default ChannelList;