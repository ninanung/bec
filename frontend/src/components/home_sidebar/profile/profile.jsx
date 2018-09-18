import React, { Component } from 'react';

import './profile.css';

class Profile extends Component {
    render() {
        const hello = 'Hello, ' + this.props.user.id;
        return (
            <div className='profile-body'>
                <h3 className='profile-hello'>{hello}</h3>
            </div>
        )
    }
}

export default Profile;