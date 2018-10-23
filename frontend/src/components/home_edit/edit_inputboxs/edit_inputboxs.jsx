import React from 'reacr';

import EditBasicInfo from './edit_basic_info/edit_basic_info';
import EditMailsSetting from './edit_mails_setting/edit_mails_setting';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
        signup_smtp: state.signup_smtp,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_basic: actions.store_signup_basic,
        store_signup_imap: actions.store_signup_imap,
        store_signup_smtp: actions.store_signup_smtp,
    }, dispatch)
}

class EditInputboxs extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInputboxs);