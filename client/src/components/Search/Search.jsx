import React from "react";
import axios from "axios";
// import fire from "../../config/fire";
import firebase from "firebase";
import "./Search.scss";
import magnify from "../../assets/icons/magnifier.svg";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
    };
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
      .push({
        creditName: this.state.results.name,
      });
  };

  render() {
    const { query, results } = this.state;
    // console.log(results);

    return (
      <div className="container">
        <h2 className="heading">TRAX</h2>

        <form onSubmit={(e) => this.fetchSearchResults(e)}>
          <label className="search-label" htmlFor="search-input">
            <input
              className="container-input"
              name="query"
              type="text"
              value={query}
              id="search-input"
              placeholder="Enter Park Name..."
              onChange={(e) => this.handleOnInputChange(e)}
            />
            <img className="search-icon" src={magnify} alt="search" />
          </label>
        </form>
        {/* hasOwnProperty("park") no keys*/}
        {Object.keys(this.state.results).length && (
          <div className="search__stats">
            <p className="search__stats-name">Coaster: {results.name} </p>
            <p className="search__stats-park">Park: {results.park}</p>
            <p className="search__stats-height">Height: {results.height} m </p>
            <p className="search__stats-speed">Speed: {results.speed} mph </p>
            {/* <img src={results.image} alt="coaster" /> */}
            <button
              onClick={this.addCredit}
              className="search__stats-addCredit"
            >
              ADD COASTER
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
