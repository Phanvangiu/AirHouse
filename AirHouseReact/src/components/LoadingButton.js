import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

export default function LoadingButton() {
  return (
    <StyledContainer>
      <ReactLoading type={"spin"} color={"rgb(255,255,255)"} height={"5%"} width={"5%"} />
    </StyledContainer>
  );
}
