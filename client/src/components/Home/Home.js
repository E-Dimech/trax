import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Trax from "../../assets/images/traxLogo.png";

class Home extends React.Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <>
        <h1>HOME HOME HOME</h1>
        <Link to="/Search">
          <img className="welcome__image" src={Trax} alt="trax" />
        </Link>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}

export default Home;
