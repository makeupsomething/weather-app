import React from 'react'
import {render, wait} from 'react-testing-library'
import Results from '../components/Results'
import {getWeatherByCityName as mockGetWeatherByCityName} from '../api'
import {getCurrentWeatherByCityName as mockGetCurrentWeatherByCityName} from '../api'

jest.mock('../api', () => {
  return {
    getWeatherByCityName: jest.fn(() => Promise.resolve({
      list: [{
        dt_txt: "2019-02-11 15:00:00",
        main: {
          grnd_level: 1030.57,
          humidity: 100,
          pressure: 1030.57,
          sea_level: 1034.55,
          temp: 0.77,
          temp_kf: -0.42,
          temp_max: 1.19,
          temp_min: 0.77,
        },
        weather: [{
          description: "light rain",
          icon: "10n",
          id: 500,
          main: "Rain",
        }]
      },
      {
        dt_txt: "2019-02-11 18:00:00",
        main: {
          grnd_level: 1030.57,
          humidity: 100,
          pressure: 1030.57,
          sea_level: 1034.55,
          temp: 0.77,
          temp_kf: -0.42,
          temp_max: 1.19,
          temp_min: 0.77,
        },
        weather: [{
          description: "light rain",
          icon: "10n",
          id: 500,
          main: "Rain",
        }]
      }],
      city: {
        country: "JP",
        name: "Tokyo",
      }
    })),
    getCurrentWeatherByCityName: jest.fn(() => Promise.resolve({
      main: {
        humidity: 100,
        pressure: 1019,
        temp: 2.16,
        temp_max: 5,
        temp_min: -0.3,
      },
      weather: [{
        description: "broken clouds",
        icon: "04n",
        id: 803,
        main: "Clouds",
      }]
    })),
  }
})

test('render something', async () => {
  const {getByText, rerender, debug} = render(<Results city='tokyo' />)
  expect(mockGetWeatherByCityName).toHaveBeenCalledTimes(1)
  await wait(() => getByText(/tokyo/i))
  expect(mockGetCurrentWeatherByCityName).toHaveBeenCalledTimes(1)
  getByText(/monday/i)
  getByText(/light rain/i)
})