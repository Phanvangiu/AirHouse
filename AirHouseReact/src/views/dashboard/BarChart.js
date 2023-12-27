import React from "react";
import { Bar } from "react-chartjs-2";
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

export default function BarChart({ chartData }) {
  return (
    <StyledContainer>

      <Bar data={chartData} options={options} />
    </StyledContainer>
  );
}
