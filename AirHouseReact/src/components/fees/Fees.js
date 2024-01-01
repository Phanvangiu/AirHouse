import React from "react";
import styled from "styled-components";
import FeesSideBar from "./FeesSideBar";
import UserTransaction from "./UserTransaction";
import { useState } from "react";
import HostRevenue from "./HostRevenue";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
  row-gap: 1rem;
  max-width: 1400px;
  padding: 0 1rem;
  margin: 2rem auto;
  margin-bottom: 2rem;
  

  > h3 {
    font-size: 17px;
    font-weight: 600;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export default function Fees() {
  const [isClickTrans, setIsClickTrans] = useState(true);


  return (
    <StyledContainer>
      <h3>Transaction History</h3>
      <div></div>
      <FeesSideBar setIsClickTrans={setIsClickTrans} />
      {isClickTrans && <UserTransaction />}
      {!isClickTrans && <HostRevenue/>}
    </StyledContainer>
  );
}
