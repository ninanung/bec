import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './home_body_header.css';
import glassicon from '../../../assets/glass_icon.png';
import mailboxicon from '../../../assets/mailbox_icon.jpg';

class HomeBodyHeader extends Component {
    toSearch = () => {
        this.props.history.push('/home/search/mail');
    }

    render() {
        return (
            <div className='header-body'>
                <h2 className='header-address'>{this.props.address}</h2>
                <img onClick={this.toSearch} src={glassicon} className='header-menu' alt='no alt' width='40' height='40' />
                <img onClick={this.props.mailboxIconClick} src={mailboxicon} className='mailbox-menu' alt='no alt' width='40' height='40' />
            </div>
        )
    }
}

HomeBodyHeader.propTypes = {
    history: PropTypes.object.isRequired,
    mailboxIconClick: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
}

export default HomeBodyHeader;