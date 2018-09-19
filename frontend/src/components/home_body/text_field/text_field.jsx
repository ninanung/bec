import React, { Component } from 'react';

import TextAreaBox from '../../text_area_box/text_area_box';

import './text_field.css';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    onTextChange = (event) => {
        this.forceUpdate();
        this.setState({text: event.target.value});
    }

    onEnterPress = (event) => {
        console.log(this.state.text);
    }

    render() {
        return (
            <div className='text-field-body'>
                <TextAreaBox history={this.props.history} onKeyPress={this.onEnterPress} typeChange={this.onTextChange} placeholder="Type and Press Enter to Send!" height={60} width={'calc(100% - 100px)'} margin={6} />
            </div>
        )
    }
}

export default TextField