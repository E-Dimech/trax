import React from "react";
import fire from "../../config/fire";
import Login from "../Login/Login";
import Home from "../Home/Home";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <>{this.state.user ? <Home uid={this.state.user.uid} /> : <Login />}</>
    );
  }
}

export default Landing;
