import React from "react";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";

import StyledBoxContainer from "../../../ui/StyledBoxContainer";
import NavBarContainer from "../../../ui/NavBarContainer";
import FilterButton from "./FIlterButton";
import NavCarouselHome from "./NavCarouselHome";
import { useStateContext } from "../../../contexts/ContextProvider";
import PopUpContainer from "ui/PopUpContainer";

const StyledTaxButton = styled(StyledBoxContainer)`
  padding: 12px 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Container = styled.div`
  background-color: blue;
  height: 100px;
`;

const StyledNavBarContainer = styled(NavBarContainer)`
  padding: 5px 0 0 0;
`;

const StyledPopUpContainer = styled(PopUpContainer)``;

export default function NavBottom() {
  const { pageWidth, clickFilter, setClickFilter } = useStateContext();

  return (
    <StyledNavBarContainer variant={"home"} gap={1}>
      <NavCarouselHome />
      {pageWidth >= 800 ? (
        <>
          <FilterButton setClickFilter={setClickFilter} />
        </>
      ) : (
        <></>
      )}
    </StyledNavBarContainer>

    // <Container/>
  );
}
