import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'request';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import constant from '../../constant/server_constant';
import * as actions from '../../store/action';

import './text_area_box.css';

const mapStateToProps = (state) => {
    return {
        sent: state.sent,
        signup_basic: state.signup_basic,
        signup_smtp: state.signup_smtp,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_sent: actions.insert_sent,
    }, dispatch);
}

let lastKeycode = null;
let lastKeycodeTime = null;

class TextAreaBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
            text: '',
        }
    }

    componentWillReceiveProps(someProp) {
        this.setState({address: this.props.address});
        if(this.state.address !== this.props.address) {
            document.getElementById('textarea').value = '';
        }
    }

    onTextChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    onEnterPress = (e) => {
        const keycode =  e.keyCode;
        if((keycode === 13 || keycode === 17) && (!lastKeycode)) {
            lastKeycode = keycode;
            lastKeycodeTime = new Date().getTime();
            return ;
        } else if((keycode === 13 || keycode === 17) && (lastKeycode)) {
            if(keycode === lastKeycode) {
                lastKeycode = keycode;
                lastKeycodeTime = new Date().getTime();
                return ;
            } else {
                if(new Date().getTime() - lastKeycodeTime < 500) {
                    this.CtrlEnter();
                }
            }
            lastKeycode = keycode;
            lastKeycodeTime = new Date().getTime();
        }
    }

    CtrlEnter = () => {
        const {sent, signup_basic, insert_sent, signup_smtp} = this.props;
        const option = {
            method: 'POST',
            url: constant.SEND_MAIL,
            json: {
                smtp: signup_smtp,
                from: {
                    name: signup_basic.name,
                    address: signup_basic.address,
                },
                to: [address],
                text: this.state.text,
            }
        }
        request(option, (err, res, body) => {
            if(err) throw err;
            if(body.error) throw body.error;
            return body.mail;
        }).then((mail) => {
            const copySent = sent.slice();
            copySent.push(mail);
            insert_sent(copySent);
        }).catch((err) => {
            alert(err);
        })
    }

    render() {
        const {width, height, placeholder, margin} = this.props;
        return (
            <textarea id='textarea' onChange={this.onTextChange} className='textareabox' onKeyDown={this.onEnterPress}
            placeholder={placeholder} style={{width: width, height: height, margin: margin}}/>
        );
    }
}

TextAreaBox.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaBox);