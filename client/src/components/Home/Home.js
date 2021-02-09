import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Maverick from "../../assets/images/maverick.png";
// import Boo from "../../assets/images/762a7944437539.58125ca053280.gif";
import coastie from "../../assets/icons/roller-coaster.svg";
// import loop from "../../assets/icons/clipart1941272.png";
// import bubble from "../../assets/icons/clipart164273.png";
import bubble from "../../assets/icons/clipart242612.png";

import firebase from "firebase";

import "./Home.scss";

class Home extends React.Component {
  state = {
    credCount: null,
    topFavCoasterNames: null,
  };

  logout() {
    fire.auth().signOut();
  }

  componentDidMount() {
    this.howMany(this.props.uid);
    this.showFavourite(this.props.uid);
  }

  howMany = (uid) => {
    firebase
      .database()
      .ref("users/" + uid)

      .once("value")
      .then((snapshot) => {
        const credCount = snapshot.child("credit").numChildren();
        this.setState({ credCount });
      });
  };

  showFavourite = (uid) => {
    firebase
      .database()
      .ref("users/" + uid)
      .child("favourite")
      .on("value", (snap) => {
        if (snap.val()) {
          let favList = Object.values(snap.val());
          const topFavCoasterNames = favList.map((fav) => fav.top5);
          this.setState({ topFavCoasterNames });
        }
      });
  };

  render() {
    const { topFavCoasterNames } = this.state;
    let formatTop5 = [];
    if (topFavCoasterNames) {
      topFavCoasterNames.forEach((coaster, index) => {
        formatTop5.push(coaster, <br key={index} />);
      });
    }
    return (
      <div className="welcome">
        <h1 className="welcome__title">TRAX</h1>
        <div className="welcome__section-container">
          <div className="welcome__img-container">
            <img className="welcome__image" src={Maverick} alt="maverick" />
          </div>
          {/* <img className="welcome__loop" src={loop} alt="coaster loop" /> */}
          <div className="welcome__bubble-container">
            <img
              className="welcome__cred-bubble"
              src={bubble}
              alt="text bubble"
            />
            <p className="welcome__cred-bubble--text">CREDITS</p>
            <p className="welcome__cred-bubble--creds">
              {this.state.credCount}
            </p>
          </div>
        </div>

        <div className="welcome__link-container">
          <Link
            className="welcome__link"
            to={{
              pathname: "/Search",
              state: {
                uid: this.props.uid,
              },
            }}
          >
            <button className="welcome__add-credit">Add Credits</button>
          </Link>
        </div>
        <div className="btm-container">
          {this.state.topFavCoasterNames != null && (
            <div className="box">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="content">
                <p className="welcome__fav-coasters-title">TOP COASTERS</p>
                <p className="welcome__fav-coasters-list">{formatTop5}</p>
              </div>
            </div>
          )}
          {/* <img className="welcome__bottom-image" src={Boo} alt="Ghost Rider" /> */}
          <img
            className="welcome__bottom-coaster"
            src={coastie}
            alt="cartoon coaster"
          />
        </div>
        <div className="welcome__logout-container">
          <button className="welcome__logout-button" onClick={this.logout}>
            Logout
          </button>
        </div>

        <div className="welcome__bottom-space"></div>
      </div>
    );
  }
}

export default Home;
