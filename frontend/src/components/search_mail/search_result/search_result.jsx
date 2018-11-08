import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MailList from '../../mail_list/mail_list';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
    }
}

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedMails: [],
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div>
                <MailList mails={this.state.searchedMails} mailbox={false} />
            </div>
        )
    }
}

SearchResult.propTypes = {
    searchText: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(SearchResult);