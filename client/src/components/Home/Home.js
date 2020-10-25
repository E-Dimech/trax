import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Maverick from "../../assets/images/maverick.png";
import Boo from "../../assets/images/762a7944437539.58125ca053280.gif";
import Halloween from "../../assets/images/halloween.png";
import "./Home.scss";

class Home extends React.Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="welcome">
        <h1 className="welcome__title">TRAX</h1>
        <div className="welcome__link-container">
          <Link to={{ pathname: "/Search", state: this.props }}>
            <img className="welcome__image" src={Maverick} alt="trax" />
          </Link>
          <p className="welcome__add-credit">Add Credits</p>
          <button className="welcome__button" onClick={this.logout}>
            Logout
          </button>
        </div>
        <img
          className="welcome__bottom-banner"
          src={Halloween}
          alt="Halloween Banner"
        />
        <img className="welcome__bottom-image" src={Boo} alt="Ghost Rider" />
      </div>
    );
  }
}

export default Home;
