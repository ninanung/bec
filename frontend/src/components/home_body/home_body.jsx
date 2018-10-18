import React from 'react';
import socketIoClient from 'socket.io-client'
import request from 'request';

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';

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
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_mails: actions.insert_mails,
    }, dispatch)
}

class HomeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            socketTrigger: 1,
            text: '',
        }
    }

    componentWillMount() {
        const {channels, fcm_cloud_messaging_token} = this.props;

        const socket = socketIoClient(socket_constant.SERVER_URL);
        const address = mails[mails.length-1].from;
        const token = fcm_cloud_messaging_token;
        let clickActionUrl = constant.BASE_URL + '/home/mailbox/unread';
        for(let i = 0; i < channels.length; i++) {
            if(channels[i] === address) {
                clickActionUrl = constant.BASE_URL + '/home/' + address;
            }
        }

        socket.on(socket_constant.UPDATE_MAILS, (mails) => {
            const latestMails = this.props.mails.slice();
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
                if(err) {
                    console.log(err);
                } else {
                    return ;
                }
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

    onTextChange = (event) => {
        this.forceUpdate();
        this.setState({text: event.target.value});
    }

    onEnterPress = (event) => {
        console.log(this.state.text);
    }

    menuIconClick = () => {
        //menu
    }

    mailboxIconClick = () => {
        //mailbox
    }

    render() {
        const address = this.props.address;
        let mailbox = false;
        if(address === 'sent' || address === 'all' || address === 'unread') {
            mailbox = true;
        }
        return (
            <div className='home-body-main'>
                <div className='header-div'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                </div>
                <div className='mails-div'>
                    <HomeBodyMails mailbox={mailbox} socketTrigger={this.state.socketTrigger} address={this.props.address} history={this.props.history} />
                    {address === 'sent' || address === 'all' || address === 'unread' ? 
                        <div className='text-div'>
                            <h1 className='text-div-h1'>Please, Click the Mails!</h1>
                        </div> :
                        <div className='textarea-div'>
                            <TextAreaBox history={this.props.history} onKeyPress={this.onEnterPress} typeChange={this.onTextChange} 
                            placeholder="Type and Press Enter to Send!" height={60} width={'calc(100% - 50px)'} margin={6} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);