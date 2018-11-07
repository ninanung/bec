import React from 'react';
import PropTypes from 'prop-types';

import HomeSidebar from '../home_sidebar/home_sidebar';
import HomeBodyHeader from '../home_body/home_body_header/home_body_header';
import HomeMobileSidebar from '../home_mobile_sidebar/home_mobile_sidebar';
import SearchInput from './search_input/search_input';
import SearchResult from './search_result/search_result';

import 'search_mail.css';

class SearchMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            searchText: '',
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

    onTextChange = (text) => {
        this.setState({
            searchText: text,
        })
    }

    render() {
        return (
            <div className='home-search'>
                <div className='home-search-sidebar'>
                    <HomeSidebar history={this.props.history} />
                </div>
                <div className='home-search-body'>
                    <div className='home-search-body-main'>
                        <div className='search-header-div'>
                            <HomeBodyHeader mailboxIconClick={this.mailboxIconClick} menuIconClick={this.menuIconClick} address='search your profile!' history={this.props.history} />
                        </div>
                        <div className='search-main-div'>
                            <div>
                                <SearchInput onTextChange={this.onTextChange} />
                            </div>
                            <div>
                                <SearchResult searchText={this.state.searchText} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.popup ? <HomeMobileSidebar sidebarArrowIconClick={this.sidebarArrowIconClick} history={this.props.history}/> : null}
            </div>
        )
    }
}

SearchMail.propTypes = {
    history: PropTypes.object.isRequired,
}

export default SearchMail;