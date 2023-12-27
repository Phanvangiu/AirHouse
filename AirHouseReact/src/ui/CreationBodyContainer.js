import React from "react";
import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
  flex-grow: 1;
  overflow: scroll;


  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContentContainer = styled.div`
  max-width: 1350px;
  margin: auto;

  ${(props) => {
    if (props.$quantity === 2) {
      return css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        @media (max-width: 950px) {
          grid-template-columns: repeat(1, 1fr);
        }
      `;
    }

    if(props.$quantity === 1){
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    }
  }};
`;

export default function CreationBodyContainer({ children, quantity }) {
  return (
    <StyledContainer>
      <StyledContentContainer $quantity={quantity}>{children}</StyledContentContainer>
    </StyledContainer>
  );
}
