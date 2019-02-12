import React from "react";
import { render } from "react-testing-library";
import Home from "../components/Home";

test("render something", async () => {
  const { getByText } = render(<Home />);
  getByText(/check the weather in/i);
});
