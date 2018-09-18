import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';

import './home_intro.css';

class HomeIntro extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar history={this.props.history}/>
                </div>
                <div className='home-body'>
                    <h1>Home sweet home!</h1>
                </div>
            </div>
        );
    }
}

export default HomeIntro;