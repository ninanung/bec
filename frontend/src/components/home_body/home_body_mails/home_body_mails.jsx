import React from 'react';
import request from 'request';

import MailItem from './mail_item/mail_item';
import ModalLoader from '../../modal_loader/modal_loader';
import constant from '../../../constant/server_constant';

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
            loading: null,
            trigger: false,
            mails: [],
        }
    }

    componentWillReceiveProps(nextProps) {
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
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state.trigger);
        console.log(nextState.trigger);
        return true;
    }

    componentWillMount() {
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
    }

    changeState = (mails) => {
        this.setState({
            trigger: Math.random(),
            mails: mails,
        })
    }

    startLoad = () => {
        this.setState({
            loading: true,
        })
    }

    endLoad = () => {
        this.setState({
            loading: false,
        })
    }

    render() {
        return (
            <div className='mails-body'>
                {this.state.loading ? <ModalLoader /> : null}
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