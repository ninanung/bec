import React from 'react';
import request from 'request';
import PropTypes from 'prop-types';

import './delete_channel_button.css';

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

class DeleteChannelButton extends React.Component {
    deleteFromChannel = (event) => {
        event.stopPropagation();
        const {address, channels, signup_basic, insert_channels} = this.props;
        for(let i = 0; i < channels.length; i++) if(channels[i] === address) return alert('There\'s nothing to delete in the channel list.');
        const option = {
            method: 'POST',
            url: constant.DELETE_CHANNELS,
            json: {
                address: address,
                id: signup_basic.id,
            },
        }
        request(option, function(err, res, body) {
            if(err) return alert(err);
            else if(body.error) return alert(body.error);
            else return insert_channels(body.channels);
        });
    }

    render() {
        return (
            <button onClick={this.deleteFromChannel} className='delete-button'>del</button>
        )
    }
}

DeleteChannelButton.proTypes = {
    address: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteChannelButton);