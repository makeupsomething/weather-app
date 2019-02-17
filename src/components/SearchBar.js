import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

const SearchBarForm = styled.form`
  font-size: 2rem;
  color: #edeff1;
`;

const SearchBarInput = styled.input`
  border: none;
  border-bottom: solid #edeff1 3px;
  background-color: #edeff1;
  color: #000000;
  font-size: 2rem;
`;

const SearchBarButton = styled.button`
  background-color: #edeff1;
  border: none;
  margin: 12px;
  font-size: 2rem;
  cursor: pointer;
`;


function SearchBar() {
  const [location, setLocation] = useState("");
  const [isSaving, setSaving] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaving(true)
    const { city } = event.target.elements;
    if (city.value) {
      setSaving(false)
      navigate(`/results/${city.value}`);
    }
  };

  return (
    <Fragment>
      <SearchBarForm onSubmit={handleSubmit}>
        <label htmlFor="city">Check the weather in: </label>
        <SearchBarInput
          required
          onChange={e => setLocation(e.target.value)}
          type="text"
          id="city"
          placeholder="Dublin"
          value={location}
        />
        <SearchBarButton type="submit" disabled={isSaving}>
          submit
        </SearchBarButton>
      </SearchBarForm>
    </Fragment>
  );
}

export default SearchBar;
