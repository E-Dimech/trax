import React from "react";
import fire from "../../config/fire";

class Home extends React.Component {
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <>
        <h1>HOME HOME HOME</h1>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}

export default Home;
