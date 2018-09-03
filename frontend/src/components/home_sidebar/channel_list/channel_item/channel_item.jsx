import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChannelItem extends Component {
    render() {
        return (
            <div className='channel-item-body'>

            </div>
        )
    }
}

ChannelItem.propTypes = {
    mail: PropTypes.object,
    index: PropTypes.number,
}

export default ChannelItem