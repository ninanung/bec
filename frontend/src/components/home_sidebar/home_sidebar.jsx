import React, { Component } from 'react';

import ChannelList from './channel_list/channel_list';
import SidebarMenu from './sidebar_menu/sidebar-menu';
import Profile from './profile/profile';

class HomeSidebar extends Component {
    render() {
        return (
            <div className='home-sidebar-body'>
                <div className='sidebar-top'>
                    <Profile />
                    <SidebarMenu />
                </div>
                <ChannelList />
            </div>
        )
    }
}

export default HomeSidebar;