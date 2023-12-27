import React from "react";
import styled, {css} from "styled-components";
import { useEffect, useState } from "react";

import NavTopHome from "./NavTopHome";
import NavBottom from "./NavBottom";

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;

  transition: all 200ms ease-in-out;


  ${(props) => {
    if (props.$scrollEffect === true) {
      return css`
        padding: 0;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      `;
    } else {
      return css`
        padding-bottom: 0.6rem;
      `;
    }
  }}
`;

export default function NavHome() {
  const [changeBottom, setChangeBottom] = useState(false);

  const handleScroll = () => {
    if (window.scrollY == 0) {
      setChangeBottom(false);
    } else {
      setChangeBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledContainer $scrollEffect={changeBottom}>
      <NavTopHome />
      <NavBottom />
    </StyledContainer>
  );
}
