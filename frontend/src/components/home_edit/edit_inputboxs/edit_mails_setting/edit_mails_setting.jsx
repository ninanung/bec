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
        signup_basic: state.signup_basic,
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

    componenttWillMount() {
        const {signup_imap, signup_smtp, settingType} = this.props;
        if(settingType === 'imap') {
            this.setDefaultState(signup_imap.imap_id, signup_imap.imap_password, signup_imap.imap_host, signup_imap.imap_port, signup_imap.imap_tls)
        } else {
            this.setDefaultState(signup_smtp.smtp_id, signup_smtp.smtp_password, signup_smtp.smtp_host, signup_smtp.smtp_port, signup_smtp.smtp_secure)
        }
    }

    setDefaultState = (id, password, host, port, security) => {
        this.setState({
            id: id,
            password: password,
            host: host,
            port: port,
            secureValue: security,
        })
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
        if(event.target.value === 'true') security = true;
        else security = false;
        this.setState({security: security});
    }

    onEditMailsSetting = () => {
        const {id, password, host, port, security} = this.state;
        const {store_signup_imap, store_signup_smtp, settingType, signup_basic} = this.props;
        if(!id || !password || !host || !port || !security) return alert('All information must be fullfilled.')
        for(let i = 0; i < port.length; i++) if(!checkNumber(port[i])) return alert('Port must be number.');
        const editInfo = {
            settingType: settingType,
            basic_id: signup_basic.id,
            id: id,
            password: password,
            host: host,
            port: port,
            security: security,
        }
        const option = {
            method: 'POST',
            uri: constant.UPDATE_USER,
            json: editInfo,
        }
        request(option, (err, res, body) => {
            if(err) throw err;
            if(body.error) throw body.error;
            else return body.info;
        }).then(function(info) {
            switch (info.settingType) { 
                case 'imap':
                    const imap_info = {
                        imap_id: info.id,
                        imap_password: info.password,
                        imap_host: info.host,
                        imap_port: info.port,
                        imap_tls: info.secure,
                    };
                    store_signup_imap(imap_info);
                    break;
                case 'smtp':
                    const smtp_info = {
                        smtp_id: info.id,
                        smtp_password: info.password,
                        smtp_host: info.host,
                        smtp_port: info.port,
                        smtp_secure: info.secure,
                    };
                    store_signup_smtp(smtp_info);
                    break;
                default:
                    break;
            }
        }).catch(function(err) {
            return alert(err);
        })
    }

    render() {
        const inputWidth = 350;
        const inputHeight = 30;
        const options = ['true', 'false'];
        const {settingType, signup_imap, signup_smtp} = this.props;

        const idValue = settingType === 'imap' ? signup_imap.imap_id : signup_smtp.smtp_id;
        const passwordValue = settingType === 'imap' ? signup_imap.imap_password : signup_smtp.smtp_password;
        const hostValue = settingType === 'imap' ? signup_imap.imap_host : signup_smtp.smtp_host;
        const portValue = settingType === 'imap' ? signup_imap.imap_port : signup_smtp.smtp_port;
        const secureValue = settingType === 'imap' ? signup_imap.imap_tls : signup_smtp.smtp_secure;

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
                        <InputBox value={idValue} typeChange={this.onIdChange} placeholder={'Email Account' + settingType + 'ID'} width={200} height={inputHeight} />
                        <p className='br'/>
                        <label>Original account password.</label>
                        <br/>
                        <InputBox value={passwordValue} type="password" typeChange={this.onPasswordChange} placeholder={'Email Account ' + settingType + ' Password'} width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>{settingType} host url. (example: {settingType}.gmail.com)</label>
                        <br/>
                        <InputBox value={hostValue} typeChange={this.onHostChange} placeholder={settingType + ' Host'} width={inputWidth} height={inputHeight} />
                        <p className='br'/>
                        <label>{settingType} host's port, normally port is 4 digits of number.</label>
                        <br/>
                        <InputBox value={portValue} typeChange={this.onPortChange} placeholder={settingType + ' Port'} width={100} height={inputHeight} />
                        <p className='br'/>
                        <label>Option about {settingType}'s security setting. normally true.</label>
                        <br/>
                        <SelectBox value={secureValue} options={options} optionChange={this.onSecurityChange} />
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