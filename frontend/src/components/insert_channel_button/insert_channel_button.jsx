import React from 'react'
import PropTypes from 'prop-types';
import request from 'request';

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
    addToChannel = (event) => {
        event.stopPropagation();
        const {name, address, channels, signup_basic, insert_channels} = this.props;
        for(let i = 0; i < channels.length; i++) {
            if(channels[i] === address) {
                return alert('There\'s already same address in the channel list.');
            }
        }
        const option = {
            method: 'POST',
            url: constant.INSERT_CHANNELS,
            json: {
                address: address,
                name: name,
                id: signup_basic.id,
            },
        }
        console.log(option);
        request(option, function(err, res, body) {
            if(err) {
                return alert(err);
            } else if(body.error) {
                return alert(body.error);
            } else {
                return insert_channels(body.channels);
            }
        });
    }

    render() {
        const {address, channels} = this.props;
        for(let i = 0; i < channels.length; i++) {
            if(channels[i].address === address) {
                return null;
            }
        }
        return (
            <button onClick={this.addToChannel} className='add-button'>add</button>
        )
    }
}

InsertChannelButton.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertChannelButton);