import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './text_area_box.css';

class TextAreaBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
        }
    }
    componentWillReceiveProps(someProps) {
        this.setState({address: this.props.address});
        if(this.state.address !== this.props.address) document.getElementById('textarea').value = '';
    }
    render() {
        const {width, height, placeholder, margin, address} = this.props;
        return (
            <textarea id='textarea' onChange={this.props.onTextChange} className='textareabox' onKeyDown={this.props.onKeyDown}
            placeholder={placeholder} style={{width: width, height: height, margin: margin}} />
        );
    }
}

TextAreaBox.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
}

export default TextAreaBox;