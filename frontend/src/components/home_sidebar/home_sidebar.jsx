import React, { Component } from 'react';

import ChannelList from './channel_list/channel_list';
import SidebarMenu from './sidebar_menu/sidebar-menu';

class HomeSidebar extends Component {
    render() {
        return (
            <div className='home-sidebar-body'>
                <SidebarMenu />
                <ChannelList />
            </div>
        )
    }
}

export default HomeSidebar;