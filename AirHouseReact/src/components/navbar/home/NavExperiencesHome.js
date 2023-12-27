import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import StyledButtonContainer from "../../../ui/StyledButtonContainer";
import StyledButtonBoxContainer from "../../../ui/StyledButtonBoxContainer";

const StyledContainer = styled(motion.div)`
  font-family: "Poppins", sans-serif;
  border-radius: 50px;
  border: 0;
  background-color: white;
  display: inline-block;
  cursor: pointer;
  padding: 0;
  margin-top: 0.2rem;

  width: 50rem;
  display: flex;
  margin-bottom: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  ${(props) => {
    if (props.$isShow) {
      return css`
        display: flex;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}

  & button {
    text-align: left;
    box-shadow: none;
    padding: 1rem;

    & p:nth-of-type(1) {
      margin-bottom: 5px;
      font-weight: 600;
    }
  }

  & button:hover {
    background-color: #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
`;

const StyledWhere = styled(StyledButtonContainer)`
  flex-grow: 1;
`;

const StyledDate = styled(StyledButtonContainer)`
  flex-grow: 1;
`;

const StyledWho = styled(StyledButtonContainer)`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .icon {
    background-color: red;
    border-radius: 50%;
    font-size: 20px;
    padding: 8px;
    color: white;
  }
`;

export default function NavExperiencesHome({ isShow }) {
  return (
    <StyledContainer
      exit={{ y: "-100%", scale: 0.4 }}
      initial={{ y: "-100%", scale: 0.4 }}
      animate={{ y: "0%", scale: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      $isShow={isShow}
    >
      <StyledWhere>
        <p>Where</p>
        <p>Search destinations</p>
      </StyledWhere>
      <StyledDate>
        <p>Date</p>
        <p>Add dates</p>
      </StyledDate>
      <StyledWho>
        <div>
          <p>Who</p>
          <p>Add guests</p>
        </div>
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </StyledWho>
    </StyledContainer>
  );
}
