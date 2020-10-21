import React from "react";
import axios from "axios";
import "./Search.scss";
import magnify from "../../assets/icons/magnifier.svg";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      message: "",
      hide: true,
    };
    this.cancel = "";
  }

  fetchSearchResults = (/*updatedPageNo = "",*/ _query) => {
    // const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const testUrl = "http://localhost:8080/search"; /* + query*/
    if (this.cancel) {
      this.cancel.cancel(); // Cancel the previous request before making a new request
    }
    this.cancel = axios.CancelToken.source(); // Create a new CancelToken

    axios
      .get(
        testUrl,
        {
          params: { query: this.state.query },
        },
        {
          cancelToken: this.cancel.token,
        }
      )
      .then((res) => {
        // console.log(res);

        const resultsNotFoundMsg = !res.data.name.length
          ? "Where are all the coasters?"
          : "";
        this.setState({
          results: res.data,
          message: resultsNotFoundMsg,
        });
        // console.log(res.data);
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            message: "Where are all the coasters?",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {} });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  // renderSearchResults = () => {
  //   // const { results } = this.state;
  //   const results = this.state.results;
  //   console.log(results, "this is the result");
  //   console.log(this.state.results, "this is this.state");
  //   if (Object.keys(results).length && results.length) {
  //     return (
  //       <div className="results-container">
  //         {this.state.results.map((results) => {
  //           return <p>{results.name}testing</p>;
  //           // return (
  //           //   //   Make this the park name, onclick user will see coasters
  //           //   <a key={results.id} href={results.image} className="result-item">
  //           //     {/* CONFIGURE THIS SECTION TO MATCH COASTER DATA */}
  //           //     {/* <h6 className="image-username">{results.name}</h6> */}
  //           //     <div className="image-wrapper">
  //           //       <img
  //           //         src={results.previewURL}
  //           //         alt={results.username}
  //           //         className="image"
  //           //       />
  //           //     </div>
  //           //   </a>
  //           // );
  //         })}
  //       </div>
  //     );
  //   }
  // };
  hide = () => {
    this.setState({ hide: false });
  };

  render() {
    const { query, message, results } = this.state;
    let hide;
    if (this.state.results) {
      hide = (
        <div>
          <p>Coaster: {results.name} </p>
          <p>Park: {results.park}</p>
          <p>Height: {results.height} m </p>
          <p>Speed: {results.speed} mph </p>
        </div>
      );
    } else {
      hide = <div></div>;
    }
    return (
      <div className="container">
        <h2 className="heading">TRAX</h2>

        <label className="search-label" htmlFor="search-input">
          <input
            className="container-input"
            name="query"
            type="text"
            value={query}
            id="search-input"
            placeholder="Enter Park Name..."
            onChange={this.handleOnInputChange}
          />
          <img className="search-icon" src={magnify} alt="search" />
        </label>
        <div>{hide}</div>
        {/* <div>
          Coaster: <b>{results ? results.name : null} </b>
        </div> */}
        {/* <p>Coaster: {results.name} </p>
        <p>Park: {results.park}</p>
        <p>Height: {results.height}</p>
        <p>Speed: {results.speed}</p> */}
        {/* <img src={results.image} alt="roller coaster" /> */}
        {message && <p className="message">{message}</p>}
        {/* {this.renderSearchResults()} */}
      </div>
    );
  }
}
export default Search;
