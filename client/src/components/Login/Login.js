import React from "react";
import fire from "../../config/fire";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log("Successfully Logged in");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signUp(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log("Successful Signup");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="login">
        <form className="login__form">
          <div className="login__email-container">
            <label className="login__email-label">Email Address</label>
            <input
              className="login__email-input"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="login__password-container">
            <label className="login__password-label">Password</label>
            <input
              className="login__password-input"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button
            className="login__button-login"
            type="submit"
            onClick={this.login}
          >
            Login
          </button>
          <button
            className="login__button-signup"
            type="submit"
            onClick={this.signup}
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
