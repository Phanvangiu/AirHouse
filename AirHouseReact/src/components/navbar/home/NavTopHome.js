import React from "react";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../../../contexts/ContextProvider";
import FilterButton from "./FIlterButton";

import NavBarContainer from "../../../ui/NavBarContainer";
import NavLogo from "./NavLogo";
import NavTopCenterHome from "./NavTopCenterHome";
import NavUser from "./NavUser";
import NavExperiencesHome from "./NavExperiencesHome";
import NavStayHome from "./NavStayHome";
import AfterEffectNavCenterHome from "./AfterEffectNavCenterHome";
import Overlay from "../../../ui/Overlay";
import PopUpContainer from "ui/PopUpContainer";
import { ReponsiveNavUser } from "./NavUser";

const StyledOverlay = styled(Overlay)`
  z-index: 19;
`;

const StyledBreak = styled.div`
  flex-basis: 100%;
`;

const StyledPopUp = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: position 1s;
  background-color: white;
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 20;
  transition: all 0.2s ease-in-out;

  ${(props) => {
    if (props.$height == false) {
      return css`
        max-height: 0px;
      `;
    } else {
      return css`
        max-height: 200px;
      `;
    }
  }}
`;

const StyledFilterPopUp = styled(PopUpContainer)``;

const ACTIONS = {
  TO_CLICK: "toClick",
  NOT_SCROLL_TOP: "notSCROLLTOP",
  OUT_OF_FOCUS: "outOfFocus",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TO_CLICK:
      return { ...state, isShow: true };

    case ACTIONS.NOT_SCROLL_TOP:
      return { ...state, isShow: false };

    case ACTIONS.OUT_OF_FOCUS:
      return { ...state, isShow: false };
  }
}

export default function NavTopHome() {
  const [state, dispatch] = useReducer(reducer, {
    isShow: false,
  });

  function clickShow() {
    dispatch({ type: ACTIONS.TO_CLICK });
  }

  function clickOut() {
    dispatch({ type: ACTIONS.OUT_OF_FOCUS });
  }

  useEffect(() => {
    window.addEventListener("scroll", clickOut);

    window.addEventListener("resize", clickOut);

    return () => {
      window.removeEventListener("scroll", clickOut);
      window.removeEventListener("resize", clickOut);
    };
  });

  const { pageWidth, setClickFilter, clickFilter } = useStateContext();

  return (
    <>
      <NavBarContainer zIndex={5} variant={"home"}>
        {pageWidth >= 800 ? <NavLogo /> : <></>}
        <AnimatePresence>{state.isShow || <NavTopCenterHome click={clickShow} />}</AnimatePresence>
        <AnimatePresence>{state.isShow && <AfterEffectNavCenterHome isStay={state.isShow} />}</AnimatePresence>
        {pageWidth >= 800 ? <NavUser /> : <FilterButton setClickFilter={setClickFilter} />}

        {pageWidth < 800 && <ReponsiveNavUser />}
      </NavBarContainer>
      {state.isShow && <StyledOverlay onClick={clickOut} />}
      <StyledPopUp $height={state.isShow}>
        <AnimatePresence>{state.isShow && <NavStayHome isShow={state.isShow} />}</AnimatePresence>
      </StyledPopUp>
    </>
  );
}
