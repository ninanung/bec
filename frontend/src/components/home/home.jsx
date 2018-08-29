import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';

class Home extends Component {
    render() {
        return (
            <div className='home-body'>
                <HomeSidebar />
            </div>
        );
    }
}

export default Home;