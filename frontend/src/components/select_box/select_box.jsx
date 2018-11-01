import React from 'react';
import PropTypes from 'prop-types';

import './select_box.css';

class SelectBox extends React.Component {
    componentDidMount() {
        const {options, value} = this.props;
        if(value) document.getElementById(value.toString() + options[0]).value = value;
    }

    render() {
        const {options, optionChange, value} = this.props;
        const optionItem = options.map((option) => {
            return <option key={option} value={option}>{option}</option>
        })
        let select;
        if(!value) select = <select onChange={optionChange} className='selectbox'>{optionItem}</select>
        else select = <select id={value.toString() + options[0]} onChange={optionChange} className='selectbox'>{optionItem}</select>
        return select;
    }
}

SelectBox.propTypes = {
    options: PropTypes.array.isRequired,
    optionChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}

export default SelectBox;