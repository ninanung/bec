import React, { Component } from 'react';

import InputBox from '../../input_box/input_box';

import './text_field.css';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    }

    onEnterPress = (event) => {
        console.log(this.state.text);
    }

    //text field needed
    render() {
        return (
            <div className='text-field-body'>
                
            </div>
        )
    }
}

export default TextField