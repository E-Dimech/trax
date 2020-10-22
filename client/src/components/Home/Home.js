import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Maverick from "../../assets/images/maverick.png";
import "./Home.scss";

class Home extends React.Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="welcome">
        <h1 className="welcome__title">HOME HOME</h1>
        <Link to={{ pathname: "/Search", state: this.props }}>
          <img className="welcome__image" src={Maverick} alt="trax" />
        </Link>
        <button className="welcome__button" onClick={this.logout}>
          Logout
        </button>
        <p className="welcome__add-credit">Add Credits</p>
      </div>
    );
  }
}

export default Home;
