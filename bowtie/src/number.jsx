import PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import 'antd/dist/antd.css';

var msgpack = require('msgpack-lite');

export default class AntNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.start};
    }

    componentDidMount() {
        var uuid = this.props.uuid;
        var socket = this.props.socket;
        socket.on(uuid + '#get', this.getValue);
    }

    getValue = (data, fn) => {
        fn(msgpack.encode(this.state.value));
    }

    // onChange = value => {
    //     this.setState({value: value.target.value});
    //     this.props.socket.emit(this.props.uuid + '#change', msgpack.encode(value.target.value));
    // }
    onChange = value => {
        this.setState({value: value});
        this.props.socket.emit(this.props.uuid + '#change', msgpack.encode(value));
    }

    render() {
        return (
            <InputNumber
                min={this.props.min}
                max={this.props.max}
                value={this.state.value}
                onChange={this.onChange}
                size={this.props.size}
            />
        );
    }
}

AntNumber.propTypes = {
    uuid: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
};
