import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
    }
}

class SearchResult extends React.Component {
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

SearchResult.propTypes = {
    searchText: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(SearchResult);