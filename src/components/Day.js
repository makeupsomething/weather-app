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
  background-color: ${props => (props.selected ? "#edeff1" : "#757575")};
  cursor: pointer;
  margin-top: 12px;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 1px 1px 1px 0px #5a5a5a94;

  ${this}:not(:last-child) {
    margin-right: 12px;
  }

  @media (max-width: 850px) {
    width: 100%;
    /* flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start; */
  }

  .item {
    width: 100%;
    @media (max-width: 850px) {
      width: 50%;
    }
  }

  .max {
    color: #db6665;
  }

  .min {
    color: #7892e5;
  }

  .description {
    font-size: 1rem;
  }
`;

function Day(props) {
  const { day, currentDay, updateSelectedDay } = props;
  const maxMinTemps = getDailyMaxAndMin(day);
  const date = dayjs(day[0].dt_txt);

  return (
    <DayContainer
      selected={date.day() === currentDay}
      onClick={() => updateSelectedDay(date.day())}
    >
      <span className="item">{date.format("dddd")}</span>
      <span className="item description">{date.format("DD/MM/YYYY")}</span>
      <span>
        <span className="max item">{Math.round(maxMinTemps.max)}&#8451;</span>
        /
        <span className="min item">{Math.round(maxMinTemps.min)}&#8451;</span>
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

export default Day;
