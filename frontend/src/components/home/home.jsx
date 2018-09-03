import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBody from '../home_body/home_body';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar />
                </div>
                <div className='home-body'>
                    <HomeBody />
                </div>
            </div>
        );
    }
}

export default Home;