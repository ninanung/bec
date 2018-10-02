import React,{ Component } from 'react';

import Loader from 'react-loader-spinner';

import './modal_loader.css';

class ModalLoader extends Component {
    render() {
        return (
            <div className='loader-body'>
                <div className='loader'>
                    <h1 className='loader-text'>Loading</h1>
                    <Loader type='Rings' color='#39AEE1' width='200' height='200' />
                </div>
            </div>
        )
    }
}

export default ModalLoader;