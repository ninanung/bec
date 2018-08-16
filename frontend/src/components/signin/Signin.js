import React, { Component } from 'react';

import InputBox from '../input_box/InputBox.js'

class Signin extends Component {
    render() {
        return (
            <div className="signin-body">
                <form>
                    <InputBox/>
                </form>
            </div>
        );
    }
}

export default Signin;