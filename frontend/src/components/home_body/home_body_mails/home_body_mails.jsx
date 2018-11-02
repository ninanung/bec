import React from 'react';
import PropsTypes from 'prop-types';

import MailItem from './mail_item/mail_item';
import DateBar from './date_bar/date_bar';

import './home_body_mails.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        mails: state.mails,
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        sent: state.sent,
    }
}

class HomeBodyMails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
            trigger: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        const {address, socketTrigger, sent, mails} = this.props;
        if(address !== nextProps.address || socketTrigger !== nextProps.socketTrigger || sent.length !== nextProps.sent.length) {
            let sortedMails = [];
            const nextAddress = nextProps.address;
            const nextSent = nextProps.sent;
            let changed = false;
            if(nextAddress === 'unread') {
                for(let i = 0; i < mails.length; i++) if(mails[i].flags.length === 0) sortedMails.push(mails[i]); 
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                changed = true;
            } else if(nextAddress === 'all') {
                sortedMails = mails.slice();
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                changed = true;
            } else if(nextAddress === 'sent') {
                sortedMails = sent.slice();
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                changed = true;
            } else {
                for(let i = 0; i < mails.length; i++) if(mails[i].from === nextAddress) sortedMails.push(mails[i]); 
                for(let j = 0; j < nextSent.length + 1; j++) {
                    for(let k = 0; k < nextSent[j].to.length; k++) {
                        if(nextSent[j].to[k] === nextAddress) {
                            sortedMails.push(nextSent[j]);
                            k = nextSent[j].to.length;
                        }
                    }
                }
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                changed = true;
            }
            if(changed) {
                sortedMails = this.insertDate(sortedMails);
                this.changeState(sortedMails);
            }
            document.getElementById('fakeDiv').scrollIntoView();
        }
    }

    componentWillMount() {
        let sortedMails = [];
        let changed = false;
        const {address, mails, sent} = this.props;
        if(address === 'unread') {
            for(let i = 0; i < mails.length; i++) if(mails[i].flags.length === 0) sortedMails.push(mails[i]); 
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            changed = true;
        } else if(address === 'all') {
            sortedMails = mails.slice();
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            changed = true;
        } else if(address === 'sent') {
            sortedMails = sent.slice();
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            changed = true;
        } else {
            for(let i = 0; i < mails.length; i++) if(mails[i].from === address) sortedMails.push(mails[i]);
            for(let j = 0; j < sent.length + 1; j++) {
                for(let k = 0; k < sent[j].to.length; k++) {
                    if(sent[j].to[k] === nextAddress) {
                        sortedMails.push(sent[j]);
                        k = sent[j].to.length;
                    }
                }
            }
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            changed = true;
        }
        if(changed) {
            sortedMails = this.insertDate(sortedMails);
            this.changeState(sortedMails);
        }
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

    changeState = (sortedMails) => {
        this.setState({
            mails: sortedMails,
            trigger: Math.random(),
        })
    }

    render() {
        const {mails} = this.state;
        if(mails.length === 0) {
            return (
                <div className='mails-body'>
                    <h1 id='fakeDiv' className='no-mails'>There's no mail to show.</h1>
                </div>
            )
        }
        return (
            <div className='mails-body'>
                {mails.map((mail, index) => {
                    if(mail.isDateBar) return <DateBar date={mail.date} />
                    if(mail.subject.length === 0) return null;
                    if(mail.sent) {
                        return <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                    } else if(this.props.mailbox) {
                        if(mail.flags && mail.flags.length === 0) return <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={this.props.mailbox} unseen={true} mail={mail} index={index} /></div>
                        return <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={this.props.mailbox} mail={mail} index={index} /></div>
                    } else {
                        if(mail.flags && mail.flags.length === 0) return <div className='mails-div-item' key={index}><MailItem sent={false} unseen={true} mail={mail} index={index} /></div>
                        return <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                    }
                })}
                <div id='fakeDiv' className='fakeDiv'></div>
            </div>
        )
    }
}

HomeBodyMails.propTypes = {
    mailBox: PropsTypes.bool,
    address: PropsTypes.object.isRequired,
    history: PropsTypes.object.isRequired,
    socketTrigger: PropsTypes.number,
}

export default connect(mapStateToProps)(HomeBodyMails);