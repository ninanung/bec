import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupMail from '../../../popup_mail/popup_mail';

class MailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }

    closePopup = () => {
        this.setState({
            popup: false,
        })
    }

    onPopup = () => {
        this.setState({
            popup: true,
        })
    }

    render() {
        const popupComponent = (
            <PopupMail mail={this.props.mail} closePopup={this.closePopup} />
        )
        return (
            <div onClick={this.onPopup()} className='mail-item-body'>
                {this.state.popup ? popupComponent : null}
            </div>
        )
    }
}

MailItem.propTypes = {
    mail: PropTypes.object,
    index: PropTypes.number,
}

export default MailItem;