import React from 'react';

import MailItem from './mail_item/mail_item';
import DateBar from './date_bar/date_bar';

import './home_body_mails.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        mails: state.mails,
        sent: state.sent,
    }
}

class HomeBodyMails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false,
            mails: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.address !== nextProps.address || this.props.socketTrigger !== nextProps.socketTrigger) {
            let sortedMails = [];
            const {sent, mails} = this.props;
            const {address} = nextProps;
            if(address === 'unread') {
                for(let i = 0; i < mails.length; i++) {
                    if(mails[i].flags.length === 0) {
                       sortedMails.push(mails[i]); 
                    }
                }
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
            } else if(address === 'all') {
                sortedMails = mails.slice();
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
            } else if(address === 'sent') {
                sortedMails = sent.slice();
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
            } else {
                for(let i = 0; i < mails.length; i++) {
                    if(mails[i].from === address) {
                       sortedMails.push(mails[i]); 
                    }
                }
                for(let i = 0; i < sent.length; i++) {
                    if(sent[i].to === address) {
                       sortedMails.push(mails[i]); 
                    }
                }
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
            }
            sortedMails = this.insertDate(sortedMails);
            this.changeState(sortedMails);
            document.getElementById('fakeDiv').scrollIntoView();
        }
    }

    componentWillMount() {
        let sortedMails = [];
        const {address, mails, sent} = this.props;
        if(address === 'unread') {
            for(let i = 0; i < mails.length; i++) {
                if(mails[i].flags.length === 0) {
                   sortedMails.push(mails[i]); 
                }
            }
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
        } else if(address === 'all') {
            sortedMails = mails.slice();
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
        } else if(address === 'sent') {
            sortedMails = sent.slice();
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
        } else {
            for(let i = 0; i < mails.length; i++) {
                if(mails[i].from === address) {
                   sortedMails.push(mails[i]); 
                }
            }
            for(let i = 0; i < sent.length; i++) {
                if(sent[i].to === address) {
                   sortedMails.push(mails[i]); 
                }
            }
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
        }
        sortedMails = this.insertDate(sortedMails);
        this.changeState(sortedMails);
    }

    componentDidMount() {
        document.getElementById('fakeDiv').scrollIntoView();
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

    changeState = (mails) => {
        this.setState({
            trigger: Math.random(),
            mails: mails,
        })
    }

    render() {
        if(this.state.mails.length === 0) {
            return (
                <div className='mails-body'>
                    <h1 id='fakeDiv' className='no-mails'>There's no mail to show.</h1>
                </div>
            )
        }
        return (
            <div className='mails-body'>
                {this.state.mails.map((mail, index) => {
                    if(mail.isDateBar) {
                        return <DateBar date={mail.date} />
                    }
                    if(mail.subject.length === 0) {
                        return null;
                    }
                    if(mail.sent) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                        )
                    } else if(this.props.mailbox) {
                        if(mail.flags && mail.flags.length === 0) {
                            return <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={this.props.mailbox} unseen={true} mail={mail} index={index} /></div>
                        }
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={this.props.mailbox} mail={mail} index={index} /></div>
                        )
                    } else {
                        if(mail.flags && mail.flags.length === 0) {
                            return <div className='mails-div-item' key={index}><MailItem sent={false} unseen={true} mail={mail} index={index} /></div>
                        }
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                        )
                    }
                })}
                <div id='fakeDiv' className='fakeDiv'></div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeBodyMails);