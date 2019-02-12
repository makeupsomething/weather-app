import React from "react";
import SearchBar from "./SearchBar";

class Home extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
  }

  componentDidMount() {
    this.geoFindMe()
  }

  success = (position) => {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({
      latitude,
      longitude
    })
  }

  error = () => {
    this.setState({
      error: "Unable to retrieve your location"
    })
  }

  geoFindMe = () => {
    if (!navigator.geolocation){
      this.setState({
        error: "eolocation is not supported by your browser"
      })
      return;
    }
    navigator.geolocation.getCurrentPosition(this.success, this.error)
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default Home;
