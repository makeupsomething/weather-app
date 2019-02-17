import React, {Fragment} from "react";
import SearchBar from "./SearchBar";

function NotFound() {
  return (
    <Fragment>
      <span>Oh no! Something went wrong!</span>
      <SearchBar />
    </Fragment>
  );
}

export default NotFound;
