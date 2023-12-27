import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 90vh;
  align-items: center;
`;

export default function Loading() {
  return (
    <StyledContainer>
      <ReactLoading type={"spin"} color={"rgb(255,0,0)"} height={"5%"} width={"5%"} />
    </StyledContainer>
  );
}
