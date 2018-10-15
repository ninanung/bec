import React from 'react';

import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';
import TextAreaBox from '../text_area_box/text_area_box';

import './home_body.css';

class HomeBody extends React.Component {
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
        const address = this.props.address;
        return (
            <div className='home-body-main'>
                <div className='header-div'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address={this.props.address} history={this.props.history} />
                </div>
                <div className='mails-div'>
                    <HomeBodyMails address={this.props.address} history={this.props.history} />
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

export default HomeBody;