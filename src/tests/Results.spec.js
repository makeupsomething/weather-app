import React from "react";
import { render, wait } from "react-testing-library";
import Results from "../components/Results";
import { navigate as mockNavigate } from "@reach/router";
import { getWeatherByCityName as mockGetWeatherByCityName } from "../api";
import { getCurrentWeatherByCityName as mockGetCurrentWeatherByCityName } from "../api";

jest.mock("@reach/router", () => {
  return {
    navigate: jest.fn(() => null)
  };
});

jest.mock("../api", () => {
  return {
    getWeatherByCityName: jest.fn(city => {
      if (city !== "tokyo") {
        return Promise.reject("404");
      }
      return Promise.resolve({
        list: [
          {
            dt_txt: "2019-02-11 15:00:00",
            main: {
              grnd_level: 1030.57,
              humidity: 100,
              pressure: 1030.57,
              sea_level: 1034.55,
              temp: 0.77,
              temp_kf: -0.42,
              temp_max: 1.19,
              temp_min: 0.77
            },
            weather: [
              {
                description: "light rain",
                icon: "10n",
                id: 500,
                main: "Rain"
              }
            ]
          },
          {
            dt_txt: "2019-02-12 15:00:00",
            main: {
              grnd_level: 1030.57,
              humidity: 100,
              pressure: 1030.57,
              sea_level: 1034.55,
              temp: 0.77,
              temp_kf: -0.42,
              temp_max: 1.19,
              temp_min: 0.77
            },
            weather: [
              {
                description: "light rain",
                icon: "10n",
                id: 500,
                main: "Rain"
              }
            ]
          }
        ],
        city: {
          country: "JP",
          name: "Tokyo"
        }
      });
    }),
    getCurrentWeatherByCityName: jest.fn(city =>
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

afterEach(() => {
  mockGetWeatherByCityName.mockClear();
  mockGetCurrentWeatherByCityName.mockClear();
});

test("render results for tokyo", async () => {
  const { getByText } = render(<Results city="tokyo" />);
  expect(mockGetWeatherByCityName).toHaveBeenCalledTimes(1);
  await wait(() => getByText(/tokyo/i));
  expect(mockGetCurrentWeatherByCityName).toHaveBeenCalledTimes(1);
  getByText(/monday/i);
  getByText(/light rain/i);
});

test("render results for tokyyo", async () => {
  render(<Results city="tokyyo" />);
  expect(mockGetWeatherByCityName).toHaveBeenCalledTimes(1);
  await wait(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("/404");
});
