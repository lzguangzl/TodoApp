import React, { Component } from "react";
import { Link } from "react-router-dom";

class WelcomeCompoonent extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Welcome!</h1>
        <div className='container'>
          Welcome {this.props.match.params.name}. You can manage your todos{" "}
          <Link to='/todos'>here</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default WelcomeCompoonent;
