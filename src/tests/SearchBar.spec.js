import React from "react";
import 'jest-dom/extend-expect';
import {navigate as mockNavigate} from "@reach/router";
import { render, fireEvent, wait } from "react-testing-library";
import SearchBar from "../components/SearchBar";

jest.mock('@reach/router', () => {
    return {
      navigate: jest.fn(() => null),
    }
})

test("cannot submit a empty input", async () => {
  const { getByText, getByLabelText, rerender, debug } = render(<SearchBar />)
  getByLabelText(/Check the weather in:/i)
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(getByText(/city cannot be empty/i)).toBeInTheDocument()
});

test("submit input", async () => {
    const { getByText, getByLabelText, rerender, debug } = render(<SearchBar />)
    getByLabelText(/Check the weather in:/i).value = "dublin"
    const submitButton = getByText(/submit/i)
    fireEvent.click(submitButton)
    await wait(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
    expect(mockNavigate).toHaveBeenCalledWith('/results/dublin')
  });
