import React from 'reacr';

import EditBasicInfo from './edit_basic_info/edit_basic_info';
import EditMailsSetting from './edit_mails_setting/edit_mails_setting';

class EditInputboxs extends React.Component {
    render() {
        return (
            <div>
                <div className='edit_basic_info'>
                    <EditBasicInfo />
                </div>
                <div className='edit_mails_setting'>
                    <EditMailsSetting settingType='smtp' />
                </div>
                <div className='edit_mails_setting'>
                    <EditMailsSetting settingType='imap' />
                </div>
            </div>
        )
    }
}

export default EditInputboxs;