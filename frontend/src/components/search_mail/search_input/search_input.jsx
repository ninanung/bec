import React from 'react';
import PropTypes from 'prop-types';

import InputBox from '../../input_box/input_box';

class SearchInput extends React.Component {
    typeChange = (e) => {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <div>
                <InputBox typeChange={this.typeChange} placeholder='Insert Keyword!' />
            </div>
        )
    }
}

SearchInput.propTypes = {
    onTextChange: PropTypes.func.isRequired,
}

export default SearchInput;