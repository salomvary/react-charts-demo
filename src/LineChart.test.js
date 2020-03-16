import React from "react";
import { render } from "@testing-library/react";
import LineChart from "./LineChart";

test("matches snapshot", () => {
  const data = [
    { day: new Date(2020, 0, 1), price: 10 },
    { day: new Date(2020, 0, 2), price: 20 }
  ];
  const { asFragment } = render(
    <LineChart width={200} height={100} data={data} />
  );
  expect(asFragment()).toMatchSnapshot();
});
