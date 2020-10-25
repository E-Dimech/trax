import React from "react";
import axios from "axios";
// import fire from "../../config/fire";
import firebase from "firebase";
// import { Link } from "react-router-dom";
// import Home from "../Home/Home";
import "./Search.scss";
import magnify from "../../assets/icons/magnifier.svg";
import coastie from "../../assets/icons/roller-coaster.svg";
import levi from "../../assets/images/hiclipart.com.png";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
      credCount: null,
    };
  }

  componentDidMount() {
    this.howMany();
  }

  fetchSearchResults = (e) => {
    e.preventDefault();
    const testUrl = "http://localhost:8080/search";

    axios
      .get(testUrl, {
        params: { query: this.state.query },
      })
      .then((res) => {
        // console.log(res);
        // const resultsNotFoundMsg = !res.data.length
        //   ? "Where are all the coasters?"
        //   : "";
        this.setState({
          results: res.data,
          // message: resultsNotFoundMsg,
        });
        console.log(res.data);
      });
  };
  // .catch((error) => {
  //   if (axios.isCancel(error) || error) {
  //     this.setState({
  //       message: "Where are all the coasters?",
  //     });
  //   }
  // });
  // };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    // if (!query) {
    //   this.setState({ query, results: {} });
    // } else {
    //   this.setState({ query, loading: true, message: "" }, () => {
    //     this.fetchSearchResults(1, query);
    //   });
    // }
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
    // console.log(this.props.location.state.uid);
    firebase
      .database()
      .ref("users/" + this.props.location.state.uid)

      .once("value")
      .then((snapshot) => {
        const credCount = snapshot.child("credit").numChildren();
        this.setState({ credCount });
      });
  };

  render() {
    const { query, results, credCount } = this.state;
    // console.log(results);

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
            />
            <img className="search-icon" src={magnify} alt="search" />
          </label>
        </form>
        {/* hasOwnProperty("park") no keys*/}
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
            </div>
          )
        }
        {/* credCount={this.credCount} */}
        {/* <Link to={{ pathname: "/Home" }}>Home</Link> */}
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
