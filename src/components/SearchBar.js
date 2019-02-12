import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

const SearchBarForm = styled.form`
  font-size: 2rem;
`;

const SearchBarInput = styled.input`
  border: none;
  border-bottom: solid black 3px;
  background-color: transparent;
  font-size: 2rem;
`;

const SearchBarButton = styled.button`
  background-color: darkgray;
  border: none;
  margin: 12px;
  padding: 12px;
  font-size: 2.5rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 1.5rem;
`;

class SearchBar extends React.Component {
  state = {
    location: "",
    isSaving: false,
    error: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { city } = event.target.elements;
    if (city.value) {
      this.setState({ isSaving: true });
      navigate(`/results/${city.value}`);
    } else {
      this.setState({ error: "City cannot be empty" });
    }
  };

  handleLocationChange = event => {
    this.setState({
      location: String(event.target.value).toLowerCase()
    });
  };

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        <SearchBarForm onSubmit={this.handleSubmit}>
          <label htmlFor="city">Check the weather in: </label>
          <SearchBarInput
            required
            onChange={this.handleLocationChange}
            type="text"
            id="city"
            placeholder="Dublin"
            value={this.state.location}
          />
          <SearchBarButton type="submit" disabled={this.state.isSaving}>
            submit
          </SearchBarButton>
        </SearchBarForm>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </React.Fragment>
    );
  }
}

export default SearchBar;
