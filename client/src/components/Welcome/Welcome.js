import React from "react";
import { Link } from "react-router-dom";
import { Trax } from "../../assets/logo/traxLogo.png";
// import "Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <Link to="/Home">
        <img src={Trax} alt="trax logo" className="welcome__image" />
      </Link>
    </div>
  );
}

export default Welcome;
