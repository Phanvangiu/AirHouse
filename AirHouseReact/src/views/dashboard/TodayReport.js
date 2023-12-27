import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LineChart from "./LineChart";
import { TodayReportQuery } from "api/reportApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div``;

const StyledChart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledReport = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  align-items: center;
  height: 5rem;

  & div {
    font-size: 20px;
    font-weight: 600;
    border: 1px solid black;
    padding: 1rem 2rem;
    border-radius: 15px;
    outline: 2px solid white;

    &:hover {
      border: 3px solid black;
      outline: none;
    }
  }
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

export default function TodayReport() {
  const todayQuery = TodayReportQuery();
  const [todayBook, setTodayBook] = useState();
  const [todayFees, setTodayFees] = useState();

  const [countData, setCountData] = useState({
    labels: null,
    datasets: [],
  });

  const [feesData, setFeesData] = useState({
    labels: null,
    datasets: [],
  });

  useEffect(() => {
    if (todayQuery.isSuccess) {
      let totalCount = 0;
      todayQuery.data.forEach((item) => {
        totalCount = totalCount + Number(item.count);
      });
      setTodayBook(totalCount);

      let totalFees = 0;
      todayQuery.data.forEach((item) => {
        totalFees = totalFees + Number(item.fees);
      });
      setTodayFees(totalFees);

      setCountData({
        labels: todayQuery.data.map((data) => data.hour),
        datasets: [
          {
            label: "count",
            data: todayQuery.data.map((data) => data.count),
            backgroundColor: monthColors,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

      setFeesData({
        labels: todayQuery.data.map((data) => data.hour),
        datasets: [
          {
            label: "fees",
            data: todayQuery.data.map((data) => data.fees),
            backgroundColor: monthColors,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [todayQuery.status]);

  return (
    <StyledContainer>
      <h3>Today Report</h3>
      <hr />
      <StyledChart>
        <LineChart chartData={countData} />
        <LineChart chartData={feesData} />
      </StyledChart>
      <StyledReport>
        <div>Bookings({todayBook})</div>
        <div>
          <FontAwesomeIcon icon={faMoneyBill} /> {todayFees}
        </div>
      </StyledReport>
    </StyledContainer>
  );
}
