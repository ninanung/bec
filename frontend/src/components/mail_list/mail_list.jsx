import React from 'react';
import PropTypes from 'prop-types';

import MailItem from '../home_body/home_body_mails/mail_item/mail_item';
import DateBar from '../home_body/home_body_mails/date_bar/date_bar';

class MailList extends React.Component {
    render() {
        const {mails, mailbox} = this.props;
        if(mails.length === 0) {
            return (
                <div className='mails-body'>
                    <h1 id='fakeDiv' className='no-mails'>There's no mail to show.</h1>
                </div>
            )
        }
        return (
            <div>
                {mails.map((mail, index) => {
                    if(mail.isDateBar) return <DateBar date={mail.date} />
                    if(mail.subject.length === 0) return null;
                    if(mail.sent) {
                        return <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                    } else if(mailbox) {
                        if(mail.flags && mail.flags.length === 0) return <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={mailbox} unseen={true} mail={mail} index={index} /></div>
                        return <div className='mails-div-item' key={index}><MailItem sent={false} mailbox={mailbox} mail={mail} index={index} /></div>
                    } else {
                        if(mail.flags && mail.flags.length === 0) return <div className='mails-div-item' key={index}><MailItem sent={false} unseen={true} mail={mail} index={index} /></div>
                        return <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                    }
                })}
            </div>
        )
    }
}

MailList.propTypes = {
    mails: PropTypes.array.isRequired,
    mailbox: PropTypes.bool,
}

export default MailList;