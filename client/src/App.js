import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import Header from "./components/Header/Header.jsx";
// import Search from "./components/Search/Search.jsx";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/Landing" component={Landing} />
        <Route path="/Login" component={Login} />
        <Route path="/Home" component={Home} />
        {/* <Route path="/Credits" component={Credits} /> */}
      </Switch>
    </Router>
  );
}

export default App;
