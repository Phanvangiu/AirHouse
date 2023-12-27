import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 80%;
  margin: auto;
`;

export const options = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
};

export default function LineChart({ chartData }) {
  return (
    <StyledContainer>
      <Line data={chartData} options={options} />
    </StyledContainer>
  );
}
