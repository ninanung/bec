import React from 'react';
import PropTypes from 'prop-types';
import request from 'request';

import './signout_button.css';

import constant from '../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_imap: state.signup_basic,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clear_signup_imap: actions.clear_signup_imap,
        clear_signup_basic: actions.clear_signup_basic,
        clear_signup_smtp: actions.clear_signup_smtp,
        empty_channels: actions.empty_channels,
        empty_mails: actions.empty_mails,
        empty_sent: actions.empty_sent,
        make_signout: actions.make_signout,
        make_wrong: actions.make_wrong,
    }, dispatch)
}


class SignoutButton extends React.Component {
    signout = (event) => {
        this.clearAll();
        //this.disconnect();
        this.props.history.push('/')
    }

    disconnect = () => {
        const option = {
            method: 'POST',
            url: constant.DISCONNECT,
            json: {
                imap_info: this.props.signup_imap,
            }
        }
        const clearAll = this.clearAll;
        request(option, function(err, res, body) {
            if(err) {
                return alert(err);
            } else if(!body) {
                return alert('something happend! Please wait and try again.');
            } else {
                clearAll();
            }
        });
    }

    clearAll = () => {
        this.props.clear_signup_basic();
        this.props.clear_signup_imap();
        this.props.clear_signup_smtp();
        this.props.empty_channels();
        this.props.empty_mails();
        this.props.empty_sent();
        this.props.make_signout();
        this.props.make_wrong();
    }

    render() {
        return (
            <button onClick={this.signout} className='signout-button'>SIGNOUT</button>
        )
    }
}

SignoutButton.propTypes = {
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignoutButton);