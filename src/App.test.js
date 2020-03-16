import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders a date label", () => {
  const { getByText } = render(<App />);
  const dateLabel = getByText(/Jan 6/i);
  expect(dateLabel).toBeInTheDocument();
});
