import React, { Component } from 'react';
import { checkNumber } from 'sign-checker/check';
import request from 'request';
import PropTypes from 'prop-types';

import InputBox from '../../../input_box/input_box';
import SelectBox from '../../../select_box/select_box';

import constant from '../../../../constant/server_constant';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../store/action';

const mapStateToProps = (state) => {
    return {
        signup_smtp: state.signup_smtp,
        signup_imap: state.signup_imap,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        store_signup_smtp: actions.store_signup_smtp,
        store_signup_imap: actions.store_signup_imap,
    }, dispatch)
}

class EditMailsSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            host: '',
            port: '',
            security: true,
        }
    }

    componentWillMount = () => {

    }

    onIdChange = (event) => {
        this.setState({id: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onHostChange = (event) => {
        this.setState({host: event.target.value});
    }

    onPortChange = (event) => {
        this.setState({port: event.target.value});
    }

    onSecurityChange = (event) => {
        let security;
        if(event.target.value === 'true') {
            security = true;
        } else {
            security = false;
        }
        this.setState({security: security});
    }

    onEditMailsSetting = () => {
        const {id, password, host, port, security} = this.state;
        const { store_signup_imap, store_signup_smtp } = this.props;
        if(!id || !password || !host || !port || !security) {
            return alert('All information must be fullfilled.')
        }
        for(let i = 0; i < port.length; i++) {
            if(!checkNumber(port[i])) {
                return alert('Port must be number.');
            }
        }
        const editInfo = {
            id: id,
            password: password,
            host: host,
            port: port,
            security: security,
        }
        const url = constant.EDIT_MAIL_SETTING + this.props.settingType; 
        const option = {
            method: 'POST',
            uri: url,
            json: editInfo,
        }
        request(option, function(err, res, body) {
            if(err) {
                throw err;
            }
            if(body.error) {
                throw body.error;
            } else {
                return ;
            }
        }).then(function() {
            //store_signup
        }).catch(function(err) {
            return alert(err);
        })
    }

    render() {
        const inputWidth = 350;
        const inputHeight = 30;
        const options = ['true', 'false'];
        const {settingType} = this.props;

        return (
            <div>
                <div className='signup-imap'>
                    <div className='signup-imap-header'>
                        <h1>Email {settingType} setting</h1>
                        <p className='signup-imap-notice'>You must confirm all informations are right. If not, you can't get any email from original account.</p>
                    </div>
                    <div className='signup-imap-body'>
                        <label>Original account ID.</label>
                        <br/>
                        <InputBox typeChange={this.onIdChange} placeholder='Email Account ID' width={200} height={inputHeight} />
                        <p className='br'/>
                        <label>Original account password.</label>
                        <br/>
                        <InputBox type="password" typeChange={this.onPasswordChange} placeholder='Email Account Password' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>{settingType} host url. (example: {settingType}.gmail.com)</label>
                        <br/>
                        <InputBox typeChange={this.onHostChange} placeholder='Imap Host' width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>{settingType} host's port, normally port is 4 digits of number.</label>
                        <br/>
                        <InputBox typeChange={this.onPortChange} placeholder='Imap Port' width={100} height={inputHeight} />
                        <p className='br'/>
                        <label>Option about {settingType}'s security setting. normally true.</label>
                        <br/>
                        <SelectBox options={options} optionChange={this.onSecurityChange} />
                        <p className='br'/>
                    </div>
                    <div className='signup-imap-footer'>
                        <button onClick={this.onEditMailsSetting} className='button signup-imap-next'>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

EditMailsSetting.propTypes = {
    settingType: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMailsSetting);