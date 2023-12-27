import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  height: 700px;
  font-size: 7rem;
  color: #717171;
  font-weight: 600;
  text-align: center;
  padding-top: 250px;
`;
const BookingNotFound = () => {
  return (
    <div>
      <StyledContainer>Booking not found</StyledContainer>
    </div>
  );
};

export default BookingNotFound;
