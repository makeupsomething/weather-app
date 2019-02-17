import React, {useState, useEffect, Fragment} from "react";
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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

function MainDetails(props) {
  const [currentWeather, setCurrentWeather] = useState(null)
  const { city } = props;
  const date = dayjs();

  const getWeather = city => {
    getCurrentWeatherByCityName(city).then(weather => {
      setCurrentWeather(weather)
    });
  };

  useEffect(() => {
    getWeather(city.name);
  }, [props.city]); 

  return (
    <DetailsContainer>
      {currentWeather ? (
        <Fragment>
          <InnerContainer>
            <span>
              {city.name}, {city.country}
            </span>
            <span className="date">{date.format("dddd")}</span>
            <span className="date">{date.format("DD/MM/YYYY")}</span>
          </InnerContainer>
          <InnerContainer>
            <span>{Math.round(currentWeather.main.temp)}&#8451;</span>
            <span className="location">
              {currentWeather.weather[0].description}
              <i
                className={`date wi wi-owm-${currentWeather.weather[0].id}`}
              />
            </span>
          </InnerContainer>
        </Fragment>
      ) : null}
    </DetailsContainer>
  );
}

export default MainDetails;
