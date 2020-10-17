import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
// import Header from "./components/Header/Header.jsx";
// import Search from "./components/Search/Search.jsx";
import "./App.scss";

function App() {
  return (
    <Router>
      <Welcome />
      {/* <Header /> */}
      {/* <Search /> */}
    </Router>
  );
}

export default App;
