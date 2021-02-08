import React from "react";
import axios from "axios";
import firebase from "firebase";

import "./Search.scss";

import microphone from "../../assets/icons/mic.svg";
import magnify from "../../assets/icons/magnifier.svg";
import coastie from "../../assets/icons/roller-coaster.svg";
import rider from "../../assets/icons/coasterperson.svg";
import riders from "../../assets/icons/coasterPeople.svg";
import levi from "../../assets/images/hiclipart.com.png";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
      credCount: null,
      topFavCoasterNames: null,
      isListening: false,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    window.scrollTo(0, 0);
    this.howMany();
    this.showFavourite();
  }

  fetchSearchResults = (e) => {
    e.preventDefault();
    const testUrl = "/search";

    axios
      .get(testUrl, {
        params: { query: this.state.query },
      })
      .then((res) => {
        this.setState({
          results: res.data,
        });
        console.log(res.data);
      })
      // };
      .catch((error) => {
        console.log(error, "Where are all the coasters?");
      });
  };

  handleOnInputChange = (event) => {
    // if statement to choose query type
    const query = event.target.value;
    this.setState({ query });
  };

  handleListen = () => {
    if (this.state.isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped mic");
      };
    }
    mic.onstart = () => {
      console.log("mic on");
    };
    mic.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((res) => res[0])
        .map((res) => res.transcript.toLowerCase())
        .join("");
      // set state for search here
      this.setState({ query: transcript });
      mic.onerror = (e) => {
        console.log(e.error);
      };
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isListening: false,
    });
  };

  addCredit = (e) => {
    e.preventDefault();

    firebase
      .database()
      .ref("users/" + this.props.location.state.uid)
      .child("credit")
      .push({
        creditName: this.state.results.name,
      });
    this.howMany();
  };

  howMany = () => {
    firebase
      .database()
      .ref("users/" + this.props.location.state.uid)

      .once("value")
      .then((snapshot) => {
        const credCount = snapshot.child("credit").numChildren();
        this.setState({ credCount });
      });
  };

  addFavourite = (e) => {
    e.preventDefault();

    firebase
      .database()
      .ref("users/" + this.props.location.state.uid)
      .child("favourite")
      .push({
        top5: this.state.results.name,
      });
    this.showFavourite();
  };

  showFavourite = () => {
    firebase
      .database()
      .ref("users/" + this.props.location.state.uid)
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
    const { query, results, credCount, topFavCoasterNames } = this.state;

    // Below formats new coaster favs to a new line
    let formatTop5 = [];
    if (topFavCoasterNames) {
      topFavCoasterNames.forEach((coaster, index) => {
        formatTop5.push(coaster, <br key={index} />);
      });
    }

    return (
      <div className="coaster-credit">
        <h2 className="coaster-credit__heading">TRAX</h2>
        <img
          className="coaster-credit__cartoon-image"
          src={coastie}
          alt="cartoon coaster"
        />
        <h2 className="coaster-credit__title">Total Coaster Credits</h2>
        <p className="coaster-credit__credit-count">{credCount}</p>
        <h3 className="coaster-credit__fav-title">Top Coasters</h3>
        <p className="coaster-credit__favourites">{formatTop5}</p>
        <div className="coaster-credit__coaster-peeps-container">
          <img
            className="coaster-credit__coaster-peeps-single"
            src={rider}
            alt="test"
          />
          <img
            className="coaster-credit__coaster-peeps-double"
            src={riders}
            alt="test"
          />
          <img
            className="coaster-credit__coaster-peeps-single"
            src={rider}
            alt="test"
          />
        </div>
        <form onSubmit={(e) => this.fetchSearchResults(e)}>
          <label
            className="coaster-credit__search-label"
            htmlFor="search-input"
          >
            <input
              className="coaster-credit__search-input"
              // autoComplete="off"
              name="query"
              type="text"
              value={query}
              id="search-input"
              placeholder="Enter Coaster Name..."
              onChange={(e) => this.handleOnInputChange(e)}
              onSubmit={() => {
                // this.setState({ isListening: false });
                this.handleSubmit();
              }}
            />
            <img
              className="coaster-credit__search-icon"
              src={magnify}
              alt="search"
            />
            <img
              className="coaster-credit__mic-icon"
              src={microphone}
              alt="microphone"
              onClick={() => {
                this.setState({ isListening: !this.state.isListening });
                console.log(this.state.isListening);
                this.handleListen();
              }}
            />
          </label>
        </form>
        {
          // Object.keys(this.state.results).length && (
          this.state.results.hasOwnProperty("park") && (
            <div className="coaster-credit__search-stats">
              <p className="coaster-credit__search-stats-name">
                COASTER: {results.name}{" "}
              </p>
              <p className="coaster-credit__search-stats-park">
                PARK: {results.park}
              </p>
              <p className="coaster-credit__search-stats-height">
                HEIGHT: {results.height} m{" "}
              </p>
              <p className="coaster-credit__search-stats-speed">
                SPEED: {results.speed} mph{" "}
              </p>
              <img
                className="coaster-credit__search-stats-image"
                src={results.image}
                alt="coaster"
              />
              <button
                onClick={this.addCredit}
                className="coaster-credit__search-stats-add-button"
              >
                ADD COASTER CREDIT
              </button>
              {/* <button
                onClick={this.deleteCredit}
                className="search-stats__deleteCredit"
              >
                DELETE COASTER
              </button> */}
              <button
                onClick={this.addFavourite}
                className="coaster-credit__search-stats-add-button"
              >
                ADD TO TOP COASTERS
              </button>
            </div>
          )
        }
        <button
          className="coaster-credit__search-stats-home-button"
          onClick={this.props.history.goBack}
        >
          Home
        </button>
        <img
          className="coaster-credit__search-stats-bottom-logo"
          src={levi}
          alt="leviathan"
        />
        {/* <Home credCount={this.state.credCount} /> */}
      </div>
    );
  }
}

export default Search;

// deleteCredit = (e) => {
//   e.preventDefault();

//   firebase
//     .database()
//     .ref("users/" + this.props.location.state.uid)
//     .child("credit")
//     .update({
//       creditName: this.state.results.name,
//     });
//   this.howMany();
// };
