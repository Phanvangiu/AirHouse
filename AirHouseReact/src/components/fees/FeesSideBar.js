import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";

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

  ${(props) => {
    if (props.$choice == true) {
      return css`
        background-color: rgba(118, 118, 118, 0.2);
      `;
    }
  }}


`;

export default function FeesSideBar({ setIsClickTrans }) {
  const [item, setItem] = useState([true, false]);

  const onClickItem = (index) => {
    const newArr = [false, false];
    newArr[index] = true;

    if (index == 0) {
      setIsClickTrans(true);
    } else {
      setIsClickTrans(false);
    }

    setItem(newArr);
  };

  return (
    <StyledSideBar>
      <StyledItem $choice={item[0]} onClick={() => onClickItem(0)}>
        User Transaction
      </StyledItem>
      <StyledItem $choice={item[1]} onClick={() => onClickItem(1)}>
        Host Revenue
      </StyledItem>
    </StyledSideBar>
  );
}
