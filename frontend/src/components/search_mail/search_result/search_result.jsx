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

    componentWillReceiveProps(nextProps) {
        const mails = this.props.mails.slice();
        const text = nextProps.searchText
        const searchedMails = [];
        mails.map((mail, index) => {
            const cc = mail.cc.slice();
            const to = mail.to.slice();
            if(mail.subject.includes(text) || mail.from.includes(text)) {
                searchedMails.push(mail);
            }
            else if(mail.text && mail.text.includes(text)) {
                searchedMails.push(mail);
            } else if(mail.html && mail.html.includes(html)) {
                searchedMails.push(mail);
            } else if(mail.name && mail.name.includes(text)) {
                searchedMails.push(mail);
            } else if(cc.length) {
                for(let i = 0; i < cc.length; i++) {
                    cc[i].includes(text);
                    searchedMails.push(mail);
                    break;
                }
            } else if(to.length) {
                for(let i = 0; i < to.length; i++) {
                    to[i].includes(text)
                    searchedMails.push(mail);
                    break;
                }
            }
        })
        searchedMails = this.insertDate(searchedMails);
        this.setState({
            searchedMails: searchedMails.slice(),
        })
    }

    insertDate = (sortedArray) => {
        if(sortedArray.length === 0) return sortedArray;
        const copy = sortedArray;
        for(let i = 0; i < sortedArray.length; i++) {
            if(i === 0) {
                const info = {
                    date: this.parseToString(sortedArray[i].date),
                    isDateBar: true,
                }
                copy.splice(i, 0, info);
            } else if(!sortedArray[i]) return copy;
            else {
                const lastDate = this.parseToString(sortedArray[i - 1].date)
                const thisDate = this.parseToString(sortedArray[i].date)
                if(lastDate !== thisDate) {
                    const info = {
                        date: this.parseToString(sortedArray[i].date),
                        isDateBar: true,
                    }
                    copy.splice(i, 0, info);
                }
            }
        }
        return copy;
    }

    parseToString = (date) => {
        return new Date(date).toString().split(" ").splice(0, 4).splice(0, 4).toString().replace(/,/g, " ");
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