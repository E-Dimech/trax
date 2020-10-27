import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Maverick from "../../assets/images/maverick.png";
import Boo from "../../assets/images/762a7944437539.58125ca053280.gif";
import coastie from "../../assets/icons/roller-coaster.svg";
import "./Home.scss";

class Home extends React.Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="welcome">
        <h1 className="welcome__title">TRAX</h1>
        <img className="welcome__image" src={Maverick} alt="trax" />
        <div className="welcome__link-container">
          <Link to={{ pathname: "/Search", state: this.props }}>
            <button className="welcome__add-credit">Add Credits</button>
          </Link>
        </div>

        <img className="welcome__bottom-image" src={Boo} alt="Ghost Rider" />
        <button className="welcome__logout-button" onClick={this.logout}>
          Logout
        </button>
        <img
          className="welcome__bottom-coaster"
          src={coastie}
          alt="cartoon coaster"
        />
      </div>
    );
  }
}

export default Home;
