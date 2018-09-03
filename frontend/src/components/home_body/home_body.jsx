import React, { Component } from 'react';

import TextField from './text_field/text_field';
import HomeBodyHeader from './home_body_header/home_body_header';
import HomeBodyMails from './home_body_mails/home_body_mails';

class HomeBody extends Component {
    render() {
        return (
            <div className='home-body-main'>
                <HomeBodyHeader />
                <HomeBodyMails />
                <TextField />
            </div>
        )
    }
}

export default HomeBody;