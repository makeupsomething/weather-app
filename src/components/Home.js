import React from "react";
import Results from "./Results";

//Shows todays forecast for a defualt city, in this case Dublin
class Home extends React.Component {
  render() {
    return <Results city="dublin" />;
  }
}

export default Home;
