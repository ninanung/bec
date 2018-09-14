import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class RouterGuard extends Component {
    componentWillMount = () => {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                {this.props.exact ? <Route exact path={this.props.path} component={this.props.component} /> : <Route path={this.props.path} component={this.props.component} />}
            </div>
        )
    }
}

export default RouterGuard;