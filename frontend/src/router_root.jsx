import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/router';

class RouterRoot extends Component {
    render() {
        return (
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        )
    }
}

export default RouterRoot;