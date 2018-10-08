import React from 'react'

import './insert_channel_button.css';

import constant from '../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        channels: state.channels,
        signup_basic: state.signup_basic,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_channels: actions.insert_channels,
    }, dispatch)
}

class InsertChannelButton extends React.Component {
    addToChannel = () => {
        const {address, channels, signup_basic, insert_channels} = this.props;
        for(let i = 0; i < channels.length; i++) {
            if(channels[i] === address) {
                return alert('There\'s already same address in the channel list.');
            }
        }
        const option = {
            method: 'POST',
            url: constant.INSERT_CHANNEL,
            json: {
                address: address,
                id: signup_basic.id,
            },
        }
        request(option, function(err, res, body) {
            if(err) {
                return alert('signin : ' + err);
            } else if(body.error) {
                return alert(body.error);
            } else {
                return insert_channels(body.channels);
            }
        });
    }

    render() {
        return (
            <div onClick={this.addToChannel} className='insert-channel-body'>
                <p>Add Channel</p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertChannelButton);