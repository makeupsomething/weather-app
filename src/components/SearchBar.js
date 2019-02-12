import React from "react";
import styled from "styled-components";

import { navigate } from "@reach/router";
import { separateByDay } from "../utils";
import { getWeatherByCityName } from "../api";

const SearchBarForm = styled.form`
  font-size: 2rem;
`;

const SearchBarInput = styled.input`
  border: none;
  border-bottom: solid black 3px;
  background-color: transparent;
  font-size: 2rem;
`;

class SearchBar extends React.Component {
  state = {
    location: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    navigate(`/results/${this.state.location}`);
  };

  handleLocationChange = event => {
    this.setState({
      location: String(event.target.value).toLowerCase()
    });
  };

  render() {
    return (
      <SearchBarForm onSubmit={this.handleSubmit} autocomplete="off">
        <label htmlFor="city">Check the weather in: </label>
        <SearchBarInput
          onChange={this.handleLocationChange}
          type="text"
          id="city"
          placeholder="Dublin"
          value={this.state.location}
        />
      </SearchBarForm>
    );
  }
}

export default SearchBar;
