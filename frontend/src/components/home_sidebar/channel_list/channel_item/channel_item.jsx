import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteChannelList from '../../../delete_channel_button/delete_channel_button';

import './channel_item.css';

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
    }
}

class ChannelItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unreadMails: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            unreadMails: this.countUnreadMails(this.props.mails, this.props.channel.address),
        })
    }

    componentWillMount() {
        this.setState({
            unreadMails: this.countUnreadMails(this.props.mails, this.props.channel.address),
        })
    }

    countUnreadMails = (mails, address) => {
        let count = 0;
        for(let i = 0; i < mails.length; i++) if(mails[i].from === address && mails[i].flags.length === 0) count++;
        return count;
    }

    clickListItem = () => {
        const {isChannel, history, channel} = this.props;
        if(!isChannel && channel.address) history.push('/home/mailbox/' + channel.address);
        else if(!channel.address) history.push('/home');
        else history.push('/home/' + channel.address);
    }

    render() {
        const {isChannel, channel} = this.props;
        return (
            <div onClick={this.clickListItem} className='channel-item-body'>
                <div className='channel-item-name'>
                    <h3>✔ {channel.name + ' '} {isChannel ? <DeleteChannelList address={channel.address} /> : null}</h3>
                </div>
                <div className='channel-item-address'>
                    {isChannel ? channel.address + ' (' + this.state.unreadMails + ')' : ''}
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

export default connect(mapStateToProps)(ChannelItem);