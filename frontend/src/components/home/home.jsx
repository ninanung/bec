import React, { Component } from 'react';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBody from '../home_body/home_body';
import MailboxHome from '../mailbox_home/mailbox_home';

import './home.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/action';
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insert_channel: actions.insert_channel
    }, dispatch)
}

class Home extends Component {
    componentWillMount = () => {

    }

    render() {
        return (
            <div className='home'>
                <div className='home-sidebar'>
                    <HomeSidebar history={this.props.history} />
                </div>
                <div className='home-body'>
                    {this.props.match.params.mailbox !== 'mailbox' ? 
                        <HomeBody address={this.props.match.params.address} history={this.props.history} /> :
                        <MailboxHome address={this.props.match.params.address} history={this.props.history} />
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapDispatchToProps)(Home);