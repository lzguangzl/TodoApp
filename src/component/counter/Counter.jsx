import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

class Counter extends Component {
  state = {
    counter: 0,
  };

  increment = (by) => {
    console.log(`increment from parent - ${by}`);
    this.setState((prevState) => {
      return { counter: prevState.counter + by };
    });
  };

  decrement = (by) => {
    console.log(`decrement from parent - ${by}`);
    this.setState((prevState) => {
      return { counter: prevState.counter - by };
    });
  };

  render() {
    return (
      <div className='counter'>
        <h1 className='header'>Counter</h1>
        <CounterButton
          by={1}
          increment={this.increment}
          decrement={this.decrement}
        />
        <CounterButton
          by={5}
          increment={this.increment}
          decrement={this.decrement}
        />
        <CounterButton
          by={10}
          increment={this.increment}
          decrement={this.decrement}
        />
        <br />
        <span className='count'>{this.state.counter}</span>
        <br />
        <br />
        <button
          className='resetButton'
          onClick={() => {
            this.setState({ counter: 0 });
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}

class CounterButton extends Component {
  render() {
    const { by, increment, decrement } = this.props;
    return (
      <div className='counter'>
        <button
          className='counterButton'
          onClick={() => {
            increment(by);
          }}
        >
          +{by}
        </button>
        <button
          className='counterButton'
          onClick={() => {
            decrement(by);
          }}
        >
          -{by}
        </button>
      </div>
    );
  }
}

CounterButton.defaultProps = {
  by: 1,
};

CounterButton.propTypes = {
  by: PropTypes.number,
};

export default Counter;
