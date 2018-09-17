import React, { Component } from 'react';

import ChannelItem from './channel_item/channel_item';

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
                {this.state.channels.map((channel, index) => {
                    return (
                        <ChannelItem history={this.props.history} channel={channel} index={index} key={index} />
                    )
                })}
            </div>
        )
    }
}

export default ChannelList;