import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { getDailyMaxAndMin } from "../utils";

const DayContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  height: 130px;
  font-size: 1.5rem;
  font-weight: 600;
  background-color: ${props => (props.selected ? "#EBD3D1" : "#FAFDF4")};
  cursor: pointer;
  margin-top: 12px;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 1px 1px 1px 0px #5a5a5a94;

  ${this}:not(:last-child) {
    margin-right: 12px;
  }

  @media (max-width: 850px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .item {
      width: 25%;
    }
  }

  .item {
    width: 100%;
    @media (max-width: 850px) {
      width: 25%;
    }
  }

  .max {
    color: indianRed;
  }

  .min {
    color: skyblue;
  }

  .description {
    font-size: 1rem;
  }
`;

class Day extends React.Component {
  render() {
    const { day, currentDay, updateSelectedDay } = this.props;
    const maxMinTemps = getDailyMaxAndMin(day);
    const date = dayjs(day[0].dt_txt);
    return (
      <DayContainer
        selected={date.day() === currentDay}
        onClick={() => updateSelectedDay(date.day())}
      >
        <span className="item">{date.format("dddd")}</span>
        <span>
          <span className="max item">{Math.round(maxMinTemps.max)}</span>/
          <span className="min item">{Math.round(maxMinTemps.min)}</span>
        </span>
        <i
          className={`wi wi-owm-${
            day[Math.round((day.length - 1) / 2)].weather[0].id
          }`}
        />
        <span className="description item">{`${
          day[Math.round((day.length - 1) / 2)].weather[0].description
        }`}</span>
      </DayContainer>
    );
  }
}

export default Day;
