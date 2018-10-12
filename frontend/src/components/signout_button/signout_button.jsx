import React from 'react';
import PropTypes from 'prop-types';
import request from 'request';

import './signout_button.css';

import constant from '../../constant/server_constant';
import ModalLoader from '../modal_loader/modal_loader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_imap: state.signup_imap,
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
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    signout = (event) => {
        this.setLoading(true);
        this.disconnect();
    }

    setLoading = (bool) => {
        this.setState({
            loading: bool,
        })
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
        const setLoading = this.setLoading;
        request(option, function(err, res, body) {
            if(err) {
                setLoading(false);
                return alert(err);
            } else if(!body) {
                setLoading(false);
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
        this.setLoading(false);
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {this.state.loading ? <ModalLoader /> : null}
                <button onClick={this.signout} className='signout-button'>SIGNOUT</button>
            </div>
        )
    }
}

SignoutButton.propTypes = {
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignoutButton);