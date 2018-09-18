import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './input_box.css';

class InputBox extends Component {
    render() {
        const {onKeyPress, width, height, placeholder, typeChange, type, margin, color} = this.props;
        return (
            <input onKeyPress={onKeyPress} type={type} onChange={typeChange} className='inputbox' placeholder={placeholder} style={{width: width, height: height, margin: margin, color: {color}}}/>
        );
    }
}

InputBox.propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    typeChange: PropTypes.func,
}

export default InputBox;