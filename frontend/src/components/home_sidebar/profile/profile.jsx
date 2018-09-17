import React, { Component } from 'react';

class Profile extends Component {
    render() {
        const hello = 'Hello, ' + this.props.user.id;
        return (
            <div className='profile-body'>
                <p>{hello}</p>
            </div>
        )
    }
}

export default Profile;