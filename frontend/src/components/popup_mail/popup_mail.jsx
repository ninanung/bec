import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopupMail extends Component {
    render() {
        return (
            <div onKeyPress={this.props.closePopup} className='popup-body'>
            
            </div>
        )
    }
}

PopupMail.propTypes = {
    mail: PropTypes.object,
    closePopup: PropTypes.func,
}

export default PopupMail