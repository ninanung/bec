import React, { Component } from 'react';

import InputBox from '../../input_box/input_box';

class TextField extends Component {
    render() {
        return (
            <div className='text-field-body'>
                <InputBox />
            </div>
        )
    }
}

export default TextField