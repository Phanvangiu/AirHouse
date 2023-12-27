import React from "react";
import styled from "styled-components";
import FooterBarCreation from "./FooterBarCreation";
import FooterHostCreation from "./FooterHostCreation";

const StyledContainer = styled.div`
  background-color: rgb(247, 247, 247);
`;

export default function FooterIndex() {
  return (
    <StyledContainer>
      <FooterHostCreation />
      <FooterBarCreation />
    </StyledContainer>
  );
}
