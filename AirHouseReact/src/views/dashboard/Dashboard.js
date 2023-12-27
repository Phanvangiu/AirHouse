import React from "react";
import styled from "styled-components";
import BookingCountReport from "./BookingCountReport";
import BookingFeeReport from "./BookingFeeReport";
import TodayReport from "./TodayReport";

const StyledContainer = styled.div`
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export default function Dashboard() {
  return (
    <StyledContainer>
      <TodayReport />
      <BookingCountReport />
      <BookingFeeReport />
    </StyledContainer>
  );
}
