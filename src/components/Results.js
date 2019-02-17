import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Day from "./Day";
import SearchBar from "./SearchBar";
import FiveDayChart from "./FiveDayChart";
import MainDetails from "./MainDetails";
import { getWeatherByCityName } from "../api";
import { separateByDay } from "../utils";
import { navigate } from "@reach/router";

const DayCards = styled.ul`
  display: flex;
  border: 0;
  padding: 0;

  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

function Results(props) {
  const [currentDay, setCurrentDay] = useState(dayjs().day())
  const [weatherDays, setWeatherDays] = useState([])
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)

  const getWeather = city => {
    getWeatherByCityName(city)
      .then(weather => {
        const days = separateByDay(weather.list);
        setWeatherDays(days)
        setCity(weather.city)
        setCountry(weather.country)
        setCurrentDay(dayjs().day())
      })
      .catch(() => {
        navigate(`/404`);
      });
  };

  useEffect(() => {
    const { city } = props;
    getWeather(city);
  }, [props.city]); 

  return (
    <Fragment>
      <SearchBar />
      {city ? (
        <MainDetails currentDay={currentDay} city={city} country={country} />
      ) : (
        <span>no city</span>
      )}
      {weatherDays.length > 0 ? (
        <Fragment>
          <FiveDayChart weatherData={weatherDays} currentDay={currentDay} />
        </Fragment>
      ) : null}
      <DayCards>
        {weatherDays.map((day, index) => (
          <Day
            key={`day-${index}`}
            day={day}
            currentDay={currentDay}
            updateSelectedDay={setCurrentDay}
          />
        ))}
      </DayCards>
    </Fragment>
  );
}

export default Results;
