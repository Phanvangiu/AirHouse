import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ListingSideBar from "./ListingSideBar";
import ListingContent from "./ListingContent";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
  row-gap: 1rem;
  max-width: 1500px;
  padding: 0 1rem;
  margin: 2rem auto;
  margin-bottom: 2rem;

  > h3 {
    font-size: 17px;
    font-weight: 600;
  }


  @media (max-width: 750px){
    grid-template-columns: 1fr;
  }
`;

export default function ListingIndex() {
  const [choice, setChoice] = useState("all");

  return (
    <StyledContainer>
      <h3>My Listing</h3> <h3></h3>
      <ListingSideBar choice={choice} setChoice={setChoice} />
      <ListingContent choice={choice} />
    </StyledContainer>
  );
}
