import React from 'react';
import PropTypes from 'prop-types';

import './date_bar.css';

class DateBar extends React.Component {
    render() {
        return (
            <div className='datebar-body'>
                <h3 className='datebar-text'>{this.props.date}</h3>
            </div>
        )
    }
}

DateBar.propTypes = {
    date: PropTypes.string.isRequired,
}

export default DateBar;