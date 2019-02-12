import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Day from "./Day";
import SearchBar from "./SearchBar";
import FiveDayChart from "./FiveDayChart";
import MainDetails from "./MainDetails";
import { getWeatherByCityName } from "../api";
import { separateByDay } from "../utils";
import { navigate } from "@reach/router";

//styled-components
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

// Results class
// Contains all the component for the /results route
// On mount and update get the 5 day weather forcast for the city
// Redirect to 404 if the api returns an error
class Results extends React.Component {
  state = {
    weatherDays: [],
    currentDay: 1,
    city: null,
    country: null
  };

  componentDidMount() {
    const { city } = this.props;
    let today = dayjs().day();
    this.setState({ currentDay: today });
    this.getWeather(city);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      const { city } = this.props;
      let today = dayjs().day();
      this.setState({ currentDay: today });
      this.getWeather(city);
    }
  }

  getWeather = city => {
    getWeatherByCityName(city)
      .then(weather => {
        const days = separateByDay(weather.list);
        this.setState({
          weatherDays: days,
          city: weather.city,
          country: weather.country
        });
      })
      .catch(() => {
        navigate(`/404`);
      });
  };

  updateSelectedDay = newDay => {
    this.setState({
      currentDay: newDay
    });
  };
  render() {
    const { weatherDays, currentDay, city, country } = this.state;
    return (
      <React.Fragment>
        <SearchBar />
        {city ? (
          <MainDetails currentDay={currentDay} city={city} country={country} />
        ) : (
          <span>no city</span>
        )}
        {weatherDays.length > 0 ? (
          <React.Fragment>
            <FiveDayChart weatherData={weatherDays} currentDay={currentDay} />
          </React.Fragment>
        ) : null}
        <DayCards>
          {weatherDays.map((day, index) => (
            <Day
              key={`day-${index}`}
              day={day}
              currentDay={currentDay}
              updateSelectedDay={this.updateSelectedDay}
            />
          ))}
        </DayCards>
      </React.Fragment>
    );
  }
}

export default Results;
