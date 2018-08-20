import React, { Component } from 'react';

import InputBox from '../input_box/input_box.js'

class Signup extends Component {
    render() {
        return (
            <div className="signup-body">
                <form>
                    <InputBox/>
                </form>
            </div>
        )
    }
}

export default Signup;