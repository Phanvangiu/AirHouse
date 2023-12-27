import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BarChart from "./BarChart";
import { ReportCountQuery } from "api/reportApi";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const StyledContainer = styled.div``;

const StyledCountReport = styled.div``;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button`
  transition: all 0.2s;
  background-color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 17px;
  font-weight: 600;

  ${(props) => {
    if (props.$active) {
      return css`
        background-color: black;
        color: white;
      `;
    }
  }}
`;

const StyledGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPie = styled.div`
  width: 60%;
  margin: auto;
`;

let monthColors = [
  "rgba(255, 0, 0, 1)", // January - Red
  "rgba(255, 165, 0, 1)", // February - Orange
  "rgba(255, 255, 0, 1)", // March - Yellow
  "rgba(0, 128, 0, 1)", // April - Green
  "rgba(0, 0, 255, 1)", // May - Blue
  "rgba(75, 0, 130, 1)", // June - Indigo
  "rgba(238, 130, 238, 1)", // July - Violet
  "rgba(165, 42, 42, 1)", // August - Brown
  "rgba(255, 192, 203, 1)", // September - Pink
  "rgba(128, 128, 128, 1)", // October - Gray
  "rgba(0, 0, 0, 1)", // November - Black
  "rgba(255, 255, 255, 1)", // December - White
];

export default function BookingCountReport() {
  const currentYear = new Date().getFullYear();
  const yearArr = [];
  let tempYear = currentYear;

  while (tempYear >= 2021) {
    yearArr.push(tempYear);

    tempYear--;
  }

  const [year, setYear] = useState();
  const initialActiveYearArr = Array(yearArr.length + 1).fill(false);
  initialActiveYearArr[0] = true;
  const [activeYear, setActiveYear] = useState(initialActiveYearArr);
  const [bar, setIsBar] = useState(true);
  const [activeChart, setActiveChart] = useState([true, false]);

  const onSetActiveChart = (index) => {
    const newArr = [false, false];
    newArr[index] = true;
    setActiveChart(newArr);
  };

  const onSetActiveYear = (index) => {
    const newArr = Array(yearArr.length + 1).fill(false);
    newArr[index] = true;

    setActiveYear(newArr);
  };

  const reportCountQuery = ReportCountQuery(year);
  const reportYearQuery = ReportCountQuery(null);

  const [data, setData] = useState({
    labels: null,
    datasets: [],
  });

  useEffect(() => {
    if (reportCountQuery.isSuccess) {
      if (reportCountQuery.data.type == "total") {
        setData({
          labels: reportCountQuery.data.report.map((data) => data.year),
          datasets: [
            {
              label: "Booking Total Report",
              data: reportCountQuery.data.report.map((data) => data.total),
              backgroundColor: monthColors,
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      }

      if (reportCountQuery.data.type == "year") {
        setData({
          labels: reportCountQuery.data.report.map((data) => data.month),
          datasets: [
            {
              label: "Booking Total Report",
              data: reportCountQuery.data.report.map((data) => data.total),
              backgroundColor: monthColors,
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      }
    }
  }, [reportCountQuery.fetchStatus]);

  const [yearData, setYearData] = useState({
    labels: null,
    datasets: [],
  });

  useEffect(() => {
    if (reportYearQuery.isSuccess) {
      setYearData({
        labels: reportYearQuery.data.report.map((data) => data.year),
        datasets: [
          {
            label: "Sum",
            data: reportYearQuery.data.report.map((data) => data.total),
            backgroundColor: monthColors,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [reportYearQuery.status]);

  const onChangeCountYearQuery = (data) => {
    if (!data) {
      setYear(null);
      return;
    }
    setYear(data);
  };

  return (
    <StyledContainer>
      <h2>Booking Count Report</h2>
      <hr />
      <StyledCountReport>
        <StyledGroup>
          <StyledButtonGroup>
            <StyledButton
              $active={activeYear[0]}
              onClick={() => {
                onSetActiveYear(0);
                onChangeCountYearQuery();
              }}
            >
              Total Year
            </StyledButton>
            {yearArr.map((item, index) => (
              <StyledButton
                $active={activeYear[index + 1]}
                key={index}
                onClick={() => {
                  onSetActiveYear(index + 1);
                  onChangeCountYearQuery(item);
                }}
              >
                {item}
              </StyledButton>
            ))}
          </StyledButtonGroup>
          <StyledButtonGroup>
            <StyledButton
              $active={activeChart[0]}
              onClick={() => {
                setIsBar(true);
                onSetActiveChart(0);
              }}
            >
              Bar
            </StyledButton>
            <StyledButton
              $active={activeChart[1]}
              onClick={() => {
                setIsBar(false);
                onSetActiveChart(1);
              }}
            >
              Line
            </StyledButton>
          </StyledButtonGroup>
        </StyledGroup>

        {bar ? <BarChart chartData={data} /> : <LineChart chartData={data} />}
      </StyledCountReport>
      <StyledPie>
        <PieChart chartData={yearData} />
      </StyledPie>
    </StyledContainer>
  );
}
