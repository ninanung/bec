import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBody from '../home_body/home_body';

import './home.css';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar history={this.props.history}/>
                </div>
                {this.props.location.pathname === '/home' ? 
                    <h1>home!</h1> : //insert home-intro component here 
                    <div className='home-body'>
                        <HomeBody />
                    </div>
                }
            </div>
        );
    }
}

export default Home;