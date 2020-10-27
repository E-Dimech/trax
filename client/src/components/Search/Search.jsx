import React from "react";
import axios from "axios";
import firebase from "firebase";
import "./Search.scss";
import magnify from "../../assets/icons/magnifier.svg";
import coastie from "../../assets/icons/roller-coaster.svg";
import rider from "../../assets/icons/coasterperson.svg";
import riders from "../../assets/icons/coasterPeople.svg";

import levi from "../../assets/images/hiclipart.com.png";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
      credCount: null,
      topFavCoasterNames: null,
    };
  }

  componentDidMount() {
    this.howMany();
    this.showFavourite();
  }

  fetchSearchResults = (e) => {
    e.preventDefault();
    const testUrl = "http://localhost:8080/search";

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
        console.log("Where are all the coasters?");
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
  };

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

  handleSearchClear = () => this.handleQueryChange("");

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
      <div className="container">
        <h2 className="heading">TRAX</h2>
        <img
          className="coaster-credit-image"
          src={coastie}
          alt="cartoon coaster"
        />
        <h2 className="coaster-credit-title">Total Coaster Credits</h2>
        <p className="coaster-credit-count">{credCount}</p>
        <h3 className="coaster-credit-fav-title">My Top 5 Coasters</h3>
        <p className="coaster-credit-favourites">{formatTop5}</p>
        <div className="testtest">
          <img className="test" src={rider} alt="test" />
          <img className="tests" src={riders} alt="test" />
          <img className="test" src={rider} alt="test" />
        </div>

        <form onSubmit={(e) => this.fetchSearchResults(e)}>
          <label className="search-label" htmlFor="search-input">
            <input
              className="container-input"
              name="query"
              type="text"
              value={query}
              id="search-input"
              placeholder="Enter Coaster Name..."
              onChange={(e) => this.handleOnInputChange(e)}
              onClear={this.handleSearchClear}
            />
            <img className="search-icon" src={magnify} alt="search" />
          </label>
        </form>
        {
          // Object.keys(this.state.results).length && (
          this.state.results.hasOwnProperty("park") && (
            <div className="search-stats">
              <p className="search-stats__name">COASTER: {results.name} </p>
              <p className="search-stats__park">PARK: {results.park}</p>
              <p className="search-stats__height">
                HEIGHT: {results.height} m{" "}
              </p>
              <p className="search-stats__speed">SPEED: {results.speed} mph </p>
              <img
                className="search-stats__image"
                src={results.image}
                alt="coaster"
              />
              <button
                onClick={this.addCredit}
                className="search-stats__addCredit"
              >
                ADD COASTER
              </button>
              {/* <button
                onClick={this.deleteCredit}
                className="search-stats__deleteCredit"
              >
                DELETE COASTER
              </button> */}
              <button
                onClick={this.addFavourite}
                className="search-stats__addCredit"
              >
                ADD TO FAVOURITE
              </button>
            </div>
          )
        }
        <button
          className="search-stats__home-button"
          onClick={this.props.history.goBack}
        >
          Home
        </button>
        <img className="search-stats__bottom-logo" src={levi} alt="leviathan" />
      </div>
    );
  }
}

export default Search;
