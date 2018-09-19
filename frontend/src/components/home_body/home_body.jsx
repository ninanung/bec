import React, { Component } from 'react';

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';

import './home_body.css';

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            text: '',
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
                <table className='table-ui'>
                    <tr className='header-tr'>
                        <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                    </tr>
                    <tr className='mails-tr'>
                        <HomeBodyMails address={this.props.address} history={this.props.history} />
                    </tr>
                    <tr className='textare-tr'>
                        <TextAreaBox history={this.props.history} onKeyPress={this.onEnterPress} typeChange={this.onTextChange} 
                        placeholder="Type and Press Enter to Send!" height={60} width={'calc(100% - 50px)'} margin={6} />
                    </tr>
                </table>
            </div>
        )
    }
}

export default HomeBody;