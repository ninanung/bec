import React from 'react';
import PropTypes from 'prop-types';

import './to_edit_profile.css';

class ToEditProfile extends React.Component {
    toEditProfile = () => {
        this.props.history.push('/home/edit/profile');
    }

    render() {
        return (
            <h2 onClick={this.toEditProfile} className='edit-text'>Edit Profile</h2>
        )
    }
}

ToEditProfile.propTypes = {
    history: PropTypes.object.isRequired,
}

export default ToEditProfile;