import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        signup_smtp: state.signup_smtp,
        is_signin: state.is_signin,
    }
}

class RouterGuard extends Component {
    componentWillMount = () => {
        console.log('router guard!')
        if(this.state.is_signin) {
            return this.props.history.push('/home');
        }
    }

    render() {
        const {path, component} = this.props;
        return (
            <div>
                { this.props.exact ? <Route exact path={path} component={component} /> : <Route path={path} component={component} /> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(RouterGuard);