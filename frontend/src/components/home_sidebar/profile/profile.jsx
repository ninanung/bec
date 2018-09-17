import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
    }
}

class Profile extends Component {
    render() {
        const hello = 'Hello, ' + this.props.signup_basic.id;
        return (
            <div className='profile-body'>
                {console.log(this.props.signup_basic)}
                <p>{hello}</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile);