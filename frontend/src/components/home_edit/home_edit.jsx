import React from 'react';
import PropTypes from 'prop-types';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBodyHeader from '../home_body/home_body_header/home_body_header';
import HomeMobileSidebar from '../home_mobile_sidebar/home_mobile_sidebar';

import './home_edit.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        signup_smtp: state.signup_smtp,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_basic: actions.store_signup_basic,
        store_signup_imap: actions.store_signup_imap,
        store_signup_smtp: actions.store_signup_smtp,
    }, dispatch)
}

class HomeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            socketTrigger: 1,
            text: '',
        }
    }

    mailboxIconClick = () => {
        this.setState({
            popup: true,
        })
    }

    sidebarArrowIconClick = () => {
        this.setState({
            popup: false,
        })
    }

    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar history={this.props.history} />
                </div>
                <div className='home-body'>
                    <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address='Edit your profile!' history={this.props.history} />
                    <div className='edit-body-main'>

                    </div>
                </div>
                {this.state.popup ? <HomeMobileSidebar sidebarArrowIconClick={this.sidebarArrowIconClick} history={this.props.history}/> : null}
            </div>
        )
    }
}

HomeEdit.propTypes = {
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeEdit);