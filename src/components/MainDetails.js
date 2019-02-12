import React from "react";
import styled from "styled-components";
import { getCurrentWeatherByCityName } from "../api";

const DetailsContainer = styled.div`
  font-size: 10rem;
  background-color: #fafdf4;
  box-shadow: 1px 1px 1px 0px #5a5a5a94;
  border-radius: 12px;
  margin: 12px 0;
  padding: 12px;

  .location {
    font-size: 3rem;
  }
`;

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
    return (
      <DetailsContainer>
        {currentWeather ? (
          <React.Fragment>
            <span>{Math.round(currentWeather.main.temp)}&#8451;</span>
            <i className={`wi wi-owm-${currentWeather.weather[0].id}`} />
            <div className="location">
              {currentWeather.weather[0].description}
            </div>
          </React.Fragment>
        ) : null}
        <div className="location">
          {city.name}, {city.country}
        </div>
      </DetailsContainer>
    );
  }
}

export default MainDetails;
