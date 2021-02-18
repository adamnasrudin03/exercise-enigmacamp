import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Counter extends Component {

    constructor(props) {
        super(props);

        this.setIntervalId = null;
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

        this.state = {
            value: this.props.min
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.increment(), 1000);
    }

    componentWillUnmount() {
        clearInterval(() => this.intervalId);
    }

    increment() {
        let value = this.state.value + 1;
        this.setState({
            value: value <= this.props.max ? value : this.props.min
        });
    }
    componentDidUpdate(prevValue) {
        let value = this.state.value;
        if (prevValue.state === value && value === this.props.min) {
            console.log("Value has been reset");
        }
    };
    decrement() {
        let value = this.state.value - 1;
        this.setState({
            value: value >= this.props.min ? value : this.props.max
        });
    }

    render() {
        const { min } = this.props;
        const { value } = this.state;
        return (
            <div>
                <button onClick={this.decrement}> - </button>
                <span>{value}</span>
                <button onClick={this.increment}> + </button><br></br>
                <button onClick={this.componentWillUnmount}> stop</button>
                {value === min && <span>This is min value</span>}
            </div>
        );
    }
}
Counter.defaultProps = {
    min: 0,
    max: 60
}
Counter.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number
}

export default Counter;