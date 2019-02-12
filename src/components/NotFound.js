import React from "react";
import SearchBar from "./SearchBar";

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>Oh no! Something went wrong!</span>
        <SearchBar />
      </React.Fragment>
    );
  }
}

export default NotFound;
