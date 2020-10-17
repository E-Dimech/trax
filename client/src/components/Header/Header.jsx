import React from "react";
import axios from "axios";

class Header extends React.Component {
  componentDidMount() {
    axios
      .get("https://captaincoaster.com/api/coasters", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "406e0870-3010-449c-bfd1-5e46460f0d4c",
        },
      })
      .then((res) => {
        console.log(res);
      });
    //   .catch((err) => setResponse(err));
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Header;
