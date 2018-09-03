import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopupMail extends Component {
    escKeyPress = (event) => {
        if(event.keyCode === '27') {
            this.props.closePopup();
        }
    }

    render() {
        return (
            <div onKeyPress={this.escKeyPress} className='popup-body'>
            
            </div>
        )
    }
}

PopupMail.propTypes = {
    mail: PropTypes.object,
    closePopup: PropTypes.func,
}

export default PopupMail