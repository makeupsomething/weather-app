import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
  XAxis
} from "recharts";

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: #fafdf4;
  box-shadow: 1px 1px 1px 0px #5a5a5a94;
  border-radius: 12px;
  margin: auto;
`;

class FiveDayChart extends React.Component {
  formatTick(tickItem) {
    return dayjs(tickItem).format("hh:00");
  }

  render() {
    const { weatherData, currentDay } = this.props;
    return (
      <ChartContainer>
        <ResponsiveContainer width="100%">
          <AreaChart
            data={weatherData[currentDay]}
            margin={{ top: 15, right: 15, bottom: 5, left: 15 }}
            baseValue="dataMin"
          >
            <XAxis dataKey="dt_txt" tickFormatter={this.formatTick} />
            <Area dataKey="main.temp" fill="purple">
              <LabelList dataKey="main.temp" position="top" />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }
}
export default FiveDayChart;