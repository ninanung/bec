import React, { Component } from 'react';
import request from 'request';
import { connect } from 'react-redux';

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';

import constant from '../../constant/server_constant';

import './home_body.css';

let mails = [];

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
    }
}

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            text: '',
            mails: [],
        }
    }

    componentWillMount() {
        let uri = '';
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
            }
        })
    }

    componentDidMount() {
        this.setState({
            mails: mails,
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
        return (
            <div className='home-body-main'>
                <div className='header-div'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                </div>
                <div className='mails-div'>
                    <HomeBodyMails mails={this.state.mails} address={this.props.address} history={this.props.history} />
                    <div className='textarea-div'>
                        <TextAreaBox history={this.props.history} onKeyPress={this.onEnterPress} typeChange={this.onTextChange} 
                        placeholder="Type and Press Enter to Send!" height={60} width={'calc(100% - 50px)'} margin={6} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeBody);