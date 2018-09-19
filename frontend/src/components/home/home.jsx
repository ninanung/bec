import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBody from '../home_body/home_body';

import './home.css';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar history={this.props.history} />
                </div>
                <div className='home-body'>
                    <HomeBody address={this.props.match.params.address} history={this.props.history} />
                </div>
            </div>
        );
    }
}

export default Home;