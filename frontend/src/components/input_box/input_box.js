import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './input_box.css';

class InputBox extends Component {
    render() {
        const {width, height, placeholder} = this.props;

        return (
            <input className="inputbox" placeholder={placeholder} style={{width: width, height: height}}/>
        );
    }
}

InputBox.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    placeholder: PropTypes.string,
}

export default InputBox;