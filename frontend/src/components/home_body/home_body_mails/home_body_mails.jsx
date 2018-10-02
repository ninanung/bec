import React from 'react';
import request from 'request';

import MailItem from './mail_item/mail_item';
import ModalLoader from '../../modal_loader/modal_loader';
import constant from '../../../constant/server_constant';

import './home_body_mails.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
    }
}

class HomeBodyMails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            trigger: false,
            mails: [],
        }
    }

    componentWillMount() {
        let uri = '';
        let mails = [];
        const { address } = this.props;
        
        if(address === 'unread') uri = constant.GET_EMAIL_UNSEEN;
        else if(address === 'all') uri = constant.GET_ALL_EMAIL_BY_ID;
        else if(address === 'sent') uri = constant.GET_EMAIL_SENT;
        else uri = constant.GET_ALL_EMAIL_BY_ADDRESS + address;

        const idInfo = {
            id: this.props.signup_basic.id,
        }
        const option = {
            method: 'POST',
            uri: uri,
            json: idInfo,
        }

        //prepare functions
        const changeState = this.changeState;
        const startLoad = this.startLoad;
        const endLoad = this.endLoad;

        startLoad();
        request(option, function(err, res, body) {
            if(err) {
                return alert('home_body_mails : ' + err);
            }
            if(body.error) {
                return alert('home_body_mails : ' + body.error);
            } else {
                mails = body.mails.slice();
                mails.sort((a, b) => {
                    return a.date - b.date;
                })
                changeState(mails);
                endLoad();
            }
        })
    }

    changeState = (mails) => {
        this.setState({
            trigger: !this.state.trigger,
            mails: mails,
        })
    }

    startLoad = () => {
        this.setState({
            loading: true,
        })
    }

    endLoad = () => {
        this.setState({
            loading: false,
        })
    }

    render() {
        return (
            <div className='mails-body'>
                {this.state.loading ? <ModalLoader /> : null}
                {this.state.mails.map((mail, index) => {
                    if(mail.sent) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                        )
                    } else if(this.props.mailbox) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem mailbox={this.props.mailbox} sent={false} mail={mail} index={index} /></div>
                        )
                    } else {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                        )
                    }
                })}  
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeBodyMails);