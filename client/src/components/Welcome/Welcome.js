import React from "react";
import { Link } from "react-router-dom";
import Trax from "../../assets/images/traxLogo.png";
import "./Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <Link to="/Landing">
        <img className="welcome__image" src={Trax} alt="trax" />
      </Link>
    </div>
  );
}

export default Welcome;
