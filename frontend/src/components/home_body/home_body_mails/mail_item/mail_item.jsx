import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'request';

import './mail_item.css';

import constant from '../../../../constant/server_constant';

import PopupMail from '../../../popup_mail/popup_mail';
import InsertChannelButton from '../../../insert_channel_button/insert_channel_button';
import ModalLoader from '../../../modal_loader/modal_loader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../store/action';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_mails: actions.insert_mails
    }, dispatch)
}

class MailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            loading: false,
        }
    }

    closePopup = () => {
        this.setState({
            popup: false,
        })
    }

    changeState = () => {
        this.setState({
            loading: false,
            popup: true,
        }) 
    }

    changeMails = (mails) => {
        this.props.insert_mails(mails);
    }

    onPopup = () => {
        const {mail} = this.props;
        if(mail.sent) {
            this.changeState();
            return ;
        }
        const option = {
            method: 'POST',
            url: constant.MARK_SEEN,
            json: {
                uid: this.props.mail.uid
            }
        }
        const changeState = this.changeState;
        const changeMails = this.changeMails;
        let mails = this.props.mails.slice();

        if(mail.flags.length === 0) {
            this.setState({
                loading: true,
            })
            request(option, function(err, res, body) {
                if(err) {
                    return alert(err);
                } else if(body.error) {
                    return alert(body.error);
                } else {
                    for(let i = 0; i < mails.length; i++) {
                        if(body.mail.uid === mails[i].uid) {
                            mails[i].flags = body.mail.flags.slice();
                            changeMails(mails);
                            changeState();
                        }
                    }
                }
            })
        } else this.changeState();
    }

    onEscClose = (event) => {
        console.log(event.keyCode)
        if(event.keyCode && event.keyCode === 27) {
            this.setState({
                popup: false,
            })
        }
    }

    render() {
        const { mail, sent } = this.props;
        const { popup, loading } = this.state;
        let whoSent = '';
        if(sent) {
            whoSent = 'mail-item-me'
        } else if(this.props.mailbox) {
            whoSent = 'mail-item-mailbox'
        } else {
            whoSent = 'mail-item-other'
        }
        if(this.props.unseen) {
            whoSent += ' unseen'
        }
        return (
            <div className={whoSent}>
                <div onClick={this.onPopup}>
                    <h2 className='mail-item-text'>{'Sub: ' + mail.subject}</h2>
                    <h3 className='mail-item-text'><InsertChannelButton name={mail.name} address={mail.from} />{' From: ' + mail.from}</h3>
                    <h3 className='mail-item-text'>{'Text: ' + mail.text}</h3>
                </div>
                {popup ? <PopupMail mail={mail} onEscClose={this.onEscClose} closePopup={this.closePopup} /> : null}
                {loading ? <ModalLoader /> : null}
            </div>
        )
    }
}

MailItem.propTypes = {
    mail: PropTypes.object,
    index: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(MailItem);