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
        console.log('receive props')
        if(this.props.address !== nextProps.address) {
            let sortedMails = [];
            const { address, mails, sent } = this.props;
            
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
            console.log(this.state.mails.length);
            console.log(sortedMails.length);
        }
    }

    componentWillMount() {
        console.log('component mount')
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
        console.log(this.state.mails.length);
        console.log(sortedMails.length);
    }

    componentDidMount() {
        console.log('did mount');
        console.log(this.state.mails.length)
    }

    componentDidUpdate() {
        console.log('did update');
        console.log(this.state.mails.length)
    }

    changeState = (mails) => {
        console.log('change state')
        this.setState({
            trigger: Math.random(),
            mails: mails,
        })
    }

    render() {
        console.log('render')
        console.log(this.state.mails.length);
        return (
            <div className='mails-body'>
                {this.state.mails.map((mail, index) => {
                    if(mail.sent) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                        )
                    } else if(this.props.mailbox) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem mailbox={this.props.mailbox} sent={false} mail={mail} index={index} /></div>
                        )
                    } else {
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