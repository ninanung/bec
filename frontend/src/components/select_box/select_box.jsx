import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './select_box.css';

class SelectBox extends Component {
    render() {
        const {options, optionChange} = this.props;

        const optionItem = options.map((option) => {
            return <option key={option} value={option}>{option}</option>
        })

        return (
            <select onChange={optionChange} className='selectbox'>
                {optionItem}
            </select>
        );
    }
}

SelectBox.propTypes = {
    options: PropTypes.array,
    optionChange: PropTypes.func,
}

export default SelectBox;