import React from "react";
import Overlay from "./Overlay";
import styled from "styled-components";
import { useEffect } from "react";

const StyledOverlay = styled(Overlay)`
  z-index: 9999;
`;

const StyledContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 10px;
  background-color: white;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`;

const StyledAbsolute = styled.div`
  position: fixed;
`;

export default function PopUpContainer({ children, setShowPopUp, className }) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  });

  return (
    <>
      <StyledOverlay className="overlay" onClick={() => setShowPopUp(false)} />
      <StyledContainer className={className}>{children}</StyledContainer>
    </>
  );
}
