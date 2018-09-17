import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        is_signin: state.is_signin,
    }
}

class RouterGuard extends Component {
    componentWillMount = () => {
        /*if(this.props.option) {
            if(this.props.option[0]) {
                if(this.props.is_signin) {
                    window.location.href = this.props.option[1];
                }
            } else {
                if(!this.props.is_signin) {
                    window.location.href = this.props.option[1];
                }
            }
        }*/
    }

    render() {
        const { path, component } = this.props;
        return (
            <div>
                {this.props.exact ? <Route exact path={path} component={component} /> : <Route path={path} component={component} />}
            </div>
        )
    }
}

RouterGuard.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool,
    option: PropTypes.array,
}

export default connect(mapStateToProps)(RouterGuard);