import React from 'react';
import PropTypes from 'prop-types';

class DateBar extends React.Component {
    render() {
        return (
            <div>{this.props.date}</div>
        )
    }
}

DateBar.propTypes = {
    date: PropTypes.string.isRequired,
}

export default DateBar;