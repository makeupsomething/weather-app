import React from "react";
import SearchBar from "./SearchBar";
import Results from "./Results"

class Home extends React.Component {
  render() {
    return (
        <Results city="dublin" />
    );
  }
}

export default Home;
