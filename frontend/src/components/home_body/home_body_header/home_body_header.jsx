import React, { Component } from 'react';

import './home_body_header.css';
import menuicon from '../../../assets/menu_icon.png';
import mailboxicon from '../../../assets/mailbox_icon.jpg';

class HomeBodyHeader extends Component {
    render() {
        return (
            <div className='header-body'>
                <h2 className='header-address'>From - {this.props.address}</h2>
                <img onClick={this.props.menuIconClick} src={menuicon} className='header-menu' alt='no alt' width='50' height='50' />
                <img onClick={this.props.mailboxIconClick} src={mailboxicon} className='mailbox-menu' alt='no alt' width='40' height='40' />
            </div>
        )
    }
}

export default HomeBodyHeader;