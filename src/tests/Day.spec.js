import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
import Day from "../components/Day";

const mockUpdateCurrentDay = jest.fn(() => {});

test("render a day card component", async () => {
  const day = [
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
  ];

  const { getByText } = render(
    <Day day={day} currentDay={1} updateSelectedDay={mockUpdateCurrentDay} />
  );
  const card = getByText(/tuesday/i);
  fireEvent.click(card);
  await wait(() => expect(mockUpdateCurrentDay).toHaveBeenCalledTimes(1));
  expect(mockUpdateCurrentDay).toHaveBeenCalledWith(2);
});
