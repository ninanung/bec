import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './text_area_box.css';

class TextAreaBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history.location.pathname,
        }
    }

    componentWillReceiveProps(someProp) {
        this.setState({history: this.props.history.location.pathname});
        if(this.state.history !== this.props.history.location.pathname) {
            document.getElementById('textarea').value = '';
        }
    }

    render() {
        const {onKeyPress, width, height, placeholder, typeChange, type, margin, color} = this.props;
        return (
            <textarea id='textarea' onKeyPress={onKeyPress} type={type} onChange={typeChange} className='textareabox' placeholder={placeholder} style={{width: width, height: height, margin: margin, color: {color}}}/>
        );
    }
}

TextAreaBox.propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    typeChange: PropTypes.func,
}

export default TextAreaBox;