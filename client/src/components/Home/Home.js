import React from "react";
import fire from "../../config/fire";
import { Link } from "react-router-dom";
import Maverick from "../../assets/images/maverick.png";
import Boo from "../../assets/images/762a7944437539.58125ca053280.gif";
import coastie from "../../assets/icons/roller-coaster.svg";
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
        <img className="welcome__image" src={Maverick} alt="trax" />
        <div className="welcome__link-container">
          <Link
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
        <img className="welcome__bottom-image" src={Boo} alt="Ghost Rider" />
        <button className="welcome__logout-button" onClick={this.logout}>
          Logout
        </button>
        <img
          className="welcome__bottom-coaster"
          src={coastie}
          alt="cartoon coaster"
        />
        <p>{this.state.credCount}</p>
        <p>{formatTop5}</p>
      </div>
    );
  }
}

export default Home;
