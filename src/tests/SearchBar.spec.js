import React from "react";
import "jest-dom/extend-expect";
import { navigate as mockNavigate } from "@reach/router";
import { render, fireEvent, wait } from "react-testing-library";
import SearchBar from "../components/SearchBar";

jest.mock("@reach/router", () => {
  return {
    navigate: jest.fn(() => null)
  };
});

test("submit a valid input", async () => {
  const { getByText, getByLabelText } = render(<SearchBar />);
  getByLabelText(/Check the weather in:/i).value = "dublin";
  const submitButton = getByText(/submit/i);
  fireEvent.click(submitButton);
  await wait(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("/results/dublin");
});
