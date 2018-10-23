import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChannelList from './channel_list/channel_list';
import SidebarMenu from './sidebar_menu/sidebar-menu';
import Profile from './profile/profile';

import { connect } from 'react-redux';

import './home_sidebar.css';
import ToEditProfile from '../to_edit_profile/to_edit_profile';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        channels: state.channels,
    }
}

class HomeSidebar extends Component {
    render() {
        const {signup_basic, channels} = this.props;
        return (
            <div className='home-sidebar-body'>
                <div className='sidebar-top'>
                    <Profile history={this.props.history} user={signup_basic} />
                    <SidebarMenu />
                </div>
                <div className='channel-list'>
                    <ChannelList history={this.props.history} channels={channels} />
                </div>
                <div className='to-edit-profile'>
                    <ToEditProfile history={this.props.history} />
                </div>
            </div>
        )
    }
}

HomeSidebar.propTypes = {
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(HomeSidebar);