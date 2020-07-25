import React, { Component } from 'react';
import './States.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(event) {
        this.setState ({ text: event.target.value });
        this.props.doOnTextChange(event.target.value);
    }

    render() {
        return (
            <input onChange={this.onTextChange}/>
        )
    }
}

export default Input;
