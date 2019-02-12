import React from "react";
import { render, wait } from "react-testing-library";
import MainDetails from "../components/MainDetails";
import { getCurrentWeatherByCityName as mockGetCurrentWeatherByCityName } from "../api";

jest.mock("../api", () => {
  return {
    getCurrentWeatherByCityName: jest.fn(() =>
      Promise.resolve({
        main: {
          humidity: 100,
          pressure: 1019,
          temp: 2.16,
          temp_max: 5,
          temp_min: -0.3
        },
        weather: [
          {
            description: "broken clouds",
            icon: "04n",
            id: 803,
            main: "Clouds"
          }
        ]
      })
    )
  };
});

test("render the main details card", async () => {
  const { getByText } = render(
    <MainDetails
      city={{
        country: "JP",
        name: "Tokyo"
      }}
    />
  );
  expect(mockGetCurrentWeatherByCityName).toHaveBeenCalledTimes(1);
  await wait(() => getByText(/tokyo/i));
  getByText(/tokyo/i);
  getByText(/broken clouds/i);
});
