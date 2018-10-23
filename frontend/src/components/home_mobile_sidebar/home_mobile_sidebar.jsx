import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChannelList from '../home_sidebar/channel_list/channel_list';
import SidebarMenu from '../home_sidebar/sidebar_menu/sidebar-menu';
import Profile from '../home_sidebar/profile/profile';

import { connect } from 'react-redux';

import './home_mobile_sidebar.css';
import ToEditProfile from '../to_edit_profile/to_edit_profile';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        channels: state.channels,
    }
}

class HomeMobileSidebar extends Component {
    render() {
        const {signup_basic, channels} = this.props;
        return (
            <div className='home-mobile-sidebar-body'>
                <div onClick={this.props.sidebarArrowIconClick} class='mobile-sidebar-arrow'>{'<'}</div>
                <div className='mobile-sidebar-top'>
                    <Profile history={this.props.history} user={signup_basic}/>
                    <SidebarMenu />
                </div>
                <div className='mobile-channel-list'>
                    <ChannelList history={this.props.history} channels={channels}/>
                </div>
                <div className='to-edit-profile'>
                    <ToEditProfile history={this.props.history} />
                </div>
            </div>
        )
    }
}

HomeMobileSidebar.propTypes = {
    history: PropTypes.object.isRequired,
    sidebarArrowIconClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(HomeMobileSidebar);