import React from "react";
import { Link } from "react-router-dom";
import Trax from "../../assets/images/traxLogo.png";
import Sky from "../../assets/animation/Nature landscape background.jpg";
import Coaster from "../../assets/animation/coastertrax.png";
import Tracks from "../../assets/animation/tracks.svg";
import Train from "../../assets/animation/coasterTrain.png";
import Wheel from "../../assets/animation/wheel.png";
import "./Welcome.scss";

function Welcome() {
  return (
    <>
      <div className="welcome-page">
        <img className="welcome-page__sky" src={Sky} alt="night sky" />
        <img
          className="welcome-page__coaster-skyline1"
          src={Coaster}
          alt="coaster lift hill"
        />
        <img
          className="welcome-page__coaster-skyline2"
          src={Coaster}
          alt="coaster lift hill"
        />
        <img
          className="welcome-page__coaster-tracks1"
          src={Tracks}
          alt="coaster tracks"
        />
        <img
          className="welcome-page__coaster-tracks2"
          src={Tracks}
          alt="coaster tracks"
        />
        <img
          className="welcome-page__coaster-train"
          src={Train}
          alt="coaster train"
        />
        <img
          className="welcome-page__coaster-wheel1"
          src={Wheel}
          alt="coaster wheel"
        />
        <img
          className="welcome-page__coaster-wheel2"
          src={Wheel}
          alt="coaster wheel"
        />
      </div>
      <div>
        <Link className="welcome-page__link" to="/Landing">
          <img className="welcome-page__link-image" src={Trax} alt="trax" />
        </Link>
      </div>
    </>
  );
}

export default Welcome;
