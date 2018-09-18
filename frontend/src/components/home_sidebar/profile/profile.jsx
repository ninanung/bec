import React, { Component } from 'react';

import './profile.css';

class Profile extends Component {
    render() {
        const hello = 'Hello, ' + this.props.user.id;
        return (
            <div className='profile-body'>
                <p className='profile-hello'>{hello}</p>
            </div>
        )
    }
}

export default Profile;