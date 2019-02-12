import React from "react";
import SearchBar from "./SearchBar";

// 404 page to fallback on if a route is not found
// or weather api returns an error
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
