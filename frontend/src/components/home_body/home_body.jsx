import React from 'react';
import socketIoClient from 'socket.io-client'

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';

import './home_body.css';

import constant from '../../constant/socket_constant';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
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
        const socket = socketIoClient(constant.SERVER_URL)
        socket.on(constant.UPDATE_MAILS, (mails) => {
            const latestMails = this.props.mails.slice();
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
        return (
            <div className='home-body-main'>
                <div className='header-div'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                </div>
                <div className='mails-div'>
                    <HomeBodyMails socketTrigger={this.state.socketTrigger} address={this.props.address} history={this.props.history} />
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