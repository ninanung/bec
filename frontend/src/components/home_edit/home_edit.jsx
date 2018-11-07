import React from 'react';
import PropTypes from 'prop-types';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBodyHeader from '../home_body/home_body_header/home_body_header';
import HomeMobileSidebar from '../home_mobile_sidebar/home_mobile_sidebar';
import EditInputboxs from './edit_inputboxs/edit_inputboxs';

import './home_edit.css';

class HomeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }

    mailboxIconClick = () => {
        this.setState({
            popup: true,
        })
    }

    sidebarArrowIconClick = () => {
        this.setState({
            popup: false,
        })
    }

    render() {
        return (
            <div className='home-edit'>
                <div className='home-edit-sidebar'>
                    <HomeSidebar history={this.props.history} />
                </div>
                <div className='home-edit-body'>
                    <div className='home-edit-body-main'>
                        <div className='edit-header-div'>
                            <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address='Edit your profile!' history={this.props.history} />
                        </div>
                        <div className='edit-inputboxs-div'>
                            <EditInputboxs />
                        </div>
                    </div>
                </div>
                {this.state.popup ? <HomeMobileSidebar sidebarArrowIconClick={this.sidebarArrowIconClick} history={this.props.history}/> : null}
            </div>
        )
    }
}

HomeEdit.propTypes = {
    history: PropTypes.object.isRequired,
}

export default HomeEdit;