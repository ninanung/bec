import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignoutButton from '../../signout_button/signout_button';

import './profile.css';

class Profile extends Component {
    render() {
        const hello = 'Hello, ' + this.props.user.id + '  ';
        return (
            <div className='profile-body'>
                <h3 className='profile-hello'>{hello}<br/><SignoutButton history={this.props.history} /></h3>
            </div>
        )
    }
}

Profile.propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default Profile;