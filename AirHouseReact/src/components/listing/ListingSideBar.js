import React from "react";
import styled, {css} from "styled-components";


const StyledSideBar = styled.div`
  border: solid thin rgba(0, 0, 0, 0.2);
  height: fit-content;
`;

const StyledItem = styled.div`
  border-bottom: solid thin rgba(0, 0, 0, 0.2);
  font-size: 1em;
  cursor: pointer;
  transition: all 0.05s;
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.8);

  &:hover {
    background-color: rgba(118, 118, 118, 0.2);
  }

  ${props => {
    if(props.$choice == true){
      return css`
        background-color: rgba(118, 118, 118, 0.2);
      `;
    }
  }}
`;

export default function ListingSideBar({ setChoice, choice }) {
  return (
    <StyledSideBar>
      <StyledItem $choice={choice == "all" ? true : false} onClick={() => setChoice("all")}>
        All
      </StyledItem>
      <StyledItem $choice={choice == "listed" ? true : false} onClick={() => setChoice("listed")}>
        Listed
      </StyledItem>
      <StyledItem $choice={choice == "unlisted" ? true : false} onClick={() => setChoice("unlisted")}>
        Unlisted
      </StyledItem>
    </StyledSideBar>
  );
}
