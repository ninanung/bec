import React from 'react';

import MailItem from './mail_item/mail_item';

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
        if(this.props.address !== nextProps.address) {
            let sortedMails = [];
            const { mails, sent } = this.props;
            const address = nextProps.address;
            if(address === 'unread') {
                for(let i = 0; i < mails.length; i++) {
                    if(mails[i].flags.length === 0) {
                       sortedMails.push(mails[i]); 
                    }
                }
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                this.changeState(sortedMails);
            } else if(address === 'all') {
                sortedMails = mails;
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                this.changeState(sortedMails);
            } else if(address === 'sent') {
                sortedMails = sent;
                sortedMails.sort((a, b) => {
                    return a.date - b.date;
                })
                this.changeState(sortedMails);
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
                this.changeState(sortedMails);
            }
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
            this.changeState(sortedMails);
        } else if(address === 'all') {
            sortedMails = mails;
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            this.changeState(sortedMails);
        } else if(address === 'sent') {
            sortedMails = sent;
            sortedMails.sort((a, b) => {
                return a.date - b.date;
            })
            this.changeState(sortedMails);
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
            this.changeState(sortedMails);
        }
    }

    changeState = (mails) => {
        this.setState({
            trigger: Math.random(),
            mails: mails,
        })
    }

    render() {
        return (
            <div className='mails-body'>
                {this.state.mails.map((mail, index) => {
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
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeBodyMails);