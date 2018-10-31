import React from 'react';
import PropTypes from 'prop-types';

import './input_box.css';

class InputBox extends React.Component {
    componentDidMount() {
        const {placeholder, value} = this.props;
        if(value) {
            document.getElementById(value + placeholder).value = value;
        }
    }

    render() {
        const {onKeyPress, width, height, placeholder, typeChange, type, margin, color, value} = this.props;

        let input;
        if(!value) {
            input = <input onKeyPress={onKeyPress} type={type} onChange={typeChange} className='inputbox' placeholder={placeholder} style={{width: width, height: height, margin: margin, color: {color}}}/>
        } else {
            input = <input id={value + placeholder} onKeyPress={onKeyPress} type={type} onChange={typeChange} className='inputbox' placeholder={placeholder} style={{width: width, height: height, margin: margin, color: {color}}}/>
        }
        return input;
    }
}

InputBox.propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    typeChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}

export default InputBox;