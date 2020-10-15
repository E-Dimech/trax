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
    };
    this.cancel = "";
  }

  fetchSearchResults = (updatedPageNo = "", query) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

    if (this.cancel) {
      this.cancel.cancel(); // Cancel the previous request before making a new request
    }
    this.cancel = axios.CancelToken.source(); // Create a new CancelToken

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        // console.log(res.data)
        const resultsNotFoundMsg = !res.data.hits.length
          ? "Where are all the coasters?"
          : "";
        this.setState({
          // CHANGE HITS TO PARK ASSOCIATED NAME IN DATA
          results: res.data.hits,
          message: resultsNotFoundMsg,
        });
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

  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((results) => {
            return (
              //   Make this the park name, onclick user will see coasters
              <a
                key={results.id}
                href={results.previewURL}
                className="result-item"
              >
                {/* CONFIGURE THIS SECTION TO MATCH COASTER DATA */}
                {/* <h6 className="image-username">{results.user}</h6> */}
                <div className="image-wrapper">
                  <img
                    src={results.previewURL}
                    alt={results.username}
                    className="image"
                  />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query, message } = this.state;
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
          {/* Find search img */}
          <img className="search-icon" src={magnify} alt="search" />
        </label>
        {/*Error Message*/}
        {message && <p className="message">{message}</p>}
        {/* Result */}
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default Search;
