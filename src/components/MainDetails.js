import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getCurrentWeatherByCityName } from "../api";

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 7rem;
  background-color: #edeff1;
  box-shadow: 1px 1px 1px 0px #5a5a5a94;
  border-radius: 12px;
  margin: 12px 0;
  padding: 12px;

  .date {
    font-size: 3rem;
  }

  .location {
    font-size: 3rem;
  }

  @media (max-width: 850px) {
    font-size: 3rem;

    .date {
      font-size: 2rem;
    }

    .location {
      font-size: 2rem;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;

    i {
      display: none;
    }
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

// Main details is the large compoennt sshowing todays forecast for the city

class MainDetails extends React.Component {
  state = {
    currentWeather: null
  };

  componentDidMount() {
    const { city } = this.props;
    this.getWeather(city.name);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city.name !== prevProps.city.name) {
      const { city } = this.props;
      this.getWeather(city.name);
    }
  }

  getWeather = city => {
    getCurrentWeatherByCityName(city).then(weather => {
      this.setState({
        currentWeather: weather
      });
    });
  };

  render() {
    const { city } = this.props;
    const { currentWeather } = this.state;
    const date = dayjs();
    return (
      <DetailsContainer>
        {currentWeather ? (
          <React.Fragment>
            <DetailsContainer>
              <span>
                {city.name}, {city.country}
              </span>
              <span className="date">{date.format("dddd")}</span>
              <span className="date">{date.format("DD/MM/YYYY")}</span>
            </DetailsContainer>
            <DetailsContainer>
              <span>{Math.round(currentWeather.main.temp)}&#8451;</span>
              <span className="location">
                {currentWeather.weather[0].description}
                <i
                  className={`date wi wi-owm-${currentWeather.weather[0].id}`}
                />
              </span>
            </DetailsContainer>
          </React.Fragment>
        ) : null}
      </DetailsContainer>
    );
  }
}

export default MainDetails;
