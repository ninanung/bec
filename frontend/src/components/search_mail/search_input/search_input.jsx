import React from 'react';
import PropTypes from 'prop-types';

import InputBox from '../../input_box/input_box';

const INPUT_HEIGHT = 30;
const INPUT_WIDTH = 350;

class SearchInput extends React.Component {
    typeChange = (e) => {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <div>
                <InputBox typeChange={this.typeChange} width={INPUT_WIDTH} height={INPUT_HEIGHT} placeholder='Insert Keyword!' />
            </div>
        )
    }
}

SearchInput.propTypes = {
    onTextChange: PropTypes.func.isRequired,
}

export default SearchInput;