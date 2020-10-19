import React from "react";
import fire from "../../config/fire";
// import Trax from "../../assets/images/traxLogo.png";
import "./Login.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  login = (e) => {
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
  };

  signUp = (e) => {
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
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <>
        <div className="login-form">
          <form className="login-form__form">
            <h2 className="login-form__heading">TRAX</h2>
            <div className="login-form__email-container">
              <label className="login-form__label">Email Address</label>
              <input
                className="login-form__input"
                value={this.state.email}
                onChange={this.handleChange}
                id="email"
                type="email"
                name="email"
                //   placeholder="Enter email"
              />
            </div>
            <div className="login-form__password-container">
              <label className="login-form__label">Password</label>
              <input
                className="login-form__input"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                type="password"
                name="password"
                //   placeholder="Password"
              />
            </div>
            <div className="login-form__button-container">
              <button
                className="login-form__button-login"
                type="submit"
                onClick={this.login}
              >
                Login
              </button>
              <button
                className="login-form__button-signup"
                type="submit"
                onClick={this.signUp}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
