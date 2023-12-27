import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useStateContext } from "contexts/ContextProvider";

const Container = styled(motion.div)`
  display: flex;
  border: 0;
  gap: 10px;
  background-color: white;
  width: 10rem;

  & button {
    flex-grow: 1;
    border: 0;
    background-color: white;
    border-bottom: 2px solid red;
    padding-bottom: 8px;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
  }

  position: absolute;
  left: 50%;

  ${(props) => {
    if (props.$fontWeight === true) {
      return css`
        & .stay {
          font-weight: 600;
          border-bottom: 3px solid red;
        }

        & .ex {
          font-weight: 300;
        }

        & .ex:hover {
          border-bottom: 3px solid red;
          opacity: 0.5;
        }
      `;
    } else {
      return css`
        & .stay {
          font-weight: 300;
        }

        & .stay:hover {
          border-bottom: 3px solid red;
          opacity: 0.5;
        }

        & .ex {
          font-weight: 600;
          border-bottom: 3px solid red;
        }
      `;
    }
  }}

  @media only screen and (max-width: 1000px) {
    & {
      position: static;
      transform: translateX(0);
    }
  }
`;

export default function AfterEffectNavCenterHome({ clickStay, isStay }) {
  const { pageWidth } = useStateContext();

  const exit = { y: "-300%", x: pageWidth > 850 ? "-50%" : "", scale: 0.5 };
  const initial = { y: "-300%", x: pageWidth > 850 ? "-50%" : "", scale: 0.5 };
  const animate = { y: "0%", x: pageWidth > 850 ? "-50%" : "", scale: 1 };
  const transition = {
    ease: "easeInOut",
    duration: 0.2,
  };

  return (
    <Container exit={exit} initial={initial} animate={animate} transition={transition} $fontWeight={isStay}>
      <button className="stay">AirHouse Stays</button>
    </Container>
  );
}
