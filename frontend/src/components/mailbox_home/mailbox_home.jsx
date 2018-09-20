import React, { Component } from 'react';

import HomeBodyHeader from '../home_body/home_body_header/home_body_header'
import HomeBodyMails from '../home_body/home_body_mails/home_body_mails'

import './mailbox_home.css';

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            text: '',
        }
    }

    componentWillMount = () => {
        const address = this.props.address;
        if(address !== 'unread' && address !== 'all' && address !== 'sent') {
            this.props.history.push('/404');
        }
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
                    <HomeBodyMails address={this.props.address} history={this.props.history} />
                    <div className='text-div'>
                        <h1>Please, Click the Mails!</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeBody;