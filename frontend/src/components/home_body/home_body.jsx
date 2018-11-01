import React from 'react';
import socketIoClient from 'socket.io-client'
import request from 'request';

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';
import HomeMobileSidebar from '../home_mobile_sidebar/home_mobile_sidebar';

import './home_body.css';

import constant from '../../constant/server_constant';
import socket_constant from '../../constant/socket_constant';
import fcm from '../../fcm_config/fcm_config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
        fcm_cloud_messaging_token: state.fcm_cloud_messaging_token,
        channels: state.channels,
        sent: state.sent,
        signup_basic: state.signup_basic,
        signup_smtp: state.signup_smtp,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_mails: actions.insert_mails,
        insert_sent: actions.insert_sent,
    }, dispatch)
}

let lastKeycode = null;
let lastKeycodeTime = null;

class HomeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            popup: false,
            socketTrigger: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.address !== nextProps.address) {
            this.setState({
                popup: false,
            })
        }
    }

    componentWillMount() {
        const {channels, fcm_cloud_messaging_token} = this.props;
        const socket = socketIoClient(socket_constant.SERVER_URL);
        const token = fcm_cloud_messaging_token;
        socket.on(socket_constant.UPDATE_MAILS, (mails) => {
            const latestMails = this.props.mails.slice();
            const address = mails[mails.length-1].from;
            let clickActionUrl = constant.BASE_URL + '/home/mailbox/unread';
            for(let i = 0; i < channels.length; i++) {
                if(channels[i].address === address) {

                    clickActionUrl = constant.BASE_URL + '/home/' + address;
                }
            }
            const option = {
                method: 'POST',
                url: fcm.url,
                json: {
                    'to': token,
                    'notification': {
                        'title': 'new mail from ' + address,
                        'body': 'Please, check unread mails',
                        'click_action': clickActionUrl,
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=' + fcm.key
                }
            }
            request(option, function(res, err, body) {
                if(err) console.log(err);
                else return ;
            })
            for(let i = 0; i < mails.length; i++) {
                latestMails.push(mails[i]);
            }
            this.props.insert_mails(latestMails);
            this.setState({
                socketTrigger: Math.random(),
            })
        })
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
                if(new Date().getTime() - lastKeycodeTime < 500) this.CtrlEnter();
            }
            lastKeycode = keycode;
            lastKeycodeTime = new Date().getTime();
        }
    }

    CtrlEnter = () => {
        const {sent, signup_basic, insert_sent, signup_smtp, address} = this.props;
        const option = {
            method: 'POST',
            url: constant.SEND_MAIL,
            json: {
                id: signup_basic.id,
                smtp: signup_smtp,
                from: {
                    name: signup_basic.name,
                    address: signup_basic.address,
                },
                to: [address],
                text: this.state.text,
            }
        }
        let sentMail;
        request(option, (err, res, body) => {
            if(err) throw err;
            if(body.error) throw body.error;
            sentMail = body.mail;
            return ;
        }).then(() => {
            console.log(sentMail);
            const copySent = sent.slice();
            copySent.push(sentMail);
            insert_sent(copySent);
            this.setState({
                text: '',
            })
            const id = 'textarea';
            document.getElementById(id).value = '';
        }).catch((err) => {
            alert(err);
        })
    }

    menuIconClick = () => {
        //menu
    }

    mailboxIconClick = () => {
        this.setState({
            popup: true,
        })
    }

    sidebarArrowIconClick = () => {
        this.setState({
            popup: false,
        })
    }

    render() {
        const {history, address} = this.props;
        let mailbox = false;
        if(address === 'sent' || address === 'all' || address === 'unread') mailbox = true;
        return (
            <div className='home-body-main'>
                <div className='header-div'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={address} history={history} />
                </div>
                <div className='mails-div'>
                    <HomeBodyMails mailbox={mailbox} socketTrigger={this.state.socketTrigger} address={address} history={history} />
                    {address === 'sent' || address === 'all' || address === 'unread' ? 
                        <div className='text-div'>
                            <h1 className='text-div-h1'>Please, Click the Mails!</h1>
                        </div> :
                        <div className='textarea-div'>
                            <TextAreaBox history={history} address={address} placeholder="Press 'Ctrl + Enter' to Send!" height={60} width={'calc(100% - 50px)'} 
                            margin={6} onTextChange={this.onTextChange} onKeyDown={this.onEnterPress} />
                        </div>
                    }
                </div>
                {this.state.popup ? <HomeMobileSidebar sidebarArrowIconClick={this.sidebarArrowIconClick} history={history}/> : null}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);