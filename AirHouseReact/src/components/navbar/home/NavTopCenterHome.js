import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../contexts/ContextProvider";
import StyledButtonBoxContainer from "../../../ui/StyledButtonBoxContainer";
import StyledButtonContainer from "../../../ui/StyledButtonContainer";
import { ProvinceQuery } from "api/locationApi";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled(StyledButtonBoxContainer)`
  min-width: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: 50%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  padding: 10px 0;

  & .item {
    flex-grow: 1;
    border: 0;
    height: 1.3rem;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  & .anywhere,
  & .anyweek {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid rgba(0, 0, 0, 0.2);
    font-weight: 600;
  }

  & .addguest {
    display: flex;
    align-items: center;
    justify-content: space-around;

    > p {
      color: rgba(0, 0, 0, 0.6);
    }

    & .icon {
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 0.4rem;
      font-weight: 900;
      &:hover {
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
          rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
      }
    }

    & button {
      border: none;
      background-color: white;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 1000px) {
    & {
      position: static;
    }
  }
`;

const StyledResizeNavTop = styled(StyledButtonContainer)`
  flex: 1;
  display: flex;
  align-items: center;
  text-align: left;
  gap: 1rem;
  padding: 0.5rem 1rem;

  & .icon {
    font-size: 1.3rem;
  }

  & .flex-container {
    display: flex;
    gap: 7px;
    font-size: 13px;
    font-weight: 400;
    opacity: 0.5;
  }
`;

const formatDate = (dateObj) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const date = dateObj.getDate();

  return `${month} ${date}, ${year}`;
};

export default function NavTopCenterHome({ click }) {
  const { pageWidth, state, dispatch, ACTIONS } = useStateContext();
  const provinceQuery = ProvinceQuery();

  const exit = { x: pageWidth > 1000 ? "-50%" : "0", opacity: 0, transition: { duration: 0.01 } };
  const initial = { x: pageWidth > 1000 ? "-50%" : "0", opacity: 0 };
  const animate = { x: pageWidth > 1000 ? "-50%" : "0", opacity: 1, transition: { duration: 0.1 } };
  const transition = {
    ease: "easeInOut",
  };

  const onClearFilter = (ev) => {
    ev.stopPropagation();

    dispatch({ type: ACTIONS.CHANGE_PROVINCE, next: "none" });
    dispatch({ type: ACTIONS.CHANGE_CHECK_IN, next: null });

    dispatch({ type: ACTIONS.CHANGE_CHECK_OUT, next: null });
    dispatch({ type: ACTIONS.CHANGE_ACCOMMODATE, next: null });
  };

  return (
    <>
      {pageWidth >= 800 ? (
        <StyledContainer onClick={click} exit={exit} initial={initial} animate={animate} transition={transition}>
          {state.province == "none" && <button className="item anywhere">Anywhere</button>}
          {state.province != "none" && (
            <button className="item anywhere">
              {provinceQuery.data.find((provinceItem) => provinceItem.code == state.province).full_name}
            </button>
          )}
          {!state.checkIn && <button className="item anyweek">Any week</button>}
          {state.checkIn && (
            <button className="item anyweek">
              {formatDate(state.checkIn)} - {formatDate(state.checkOut)}
            </button>
          )}
          <button className="item addguest">
            {!state.accommodate && <span>Add guests</span>}
            {state.accommodate && <span>{state.accommodate} guests</span>}
            {(state.province != "none" || state.checkIn || state.checkOut || state.accommodate) && (
              <button onClick={onClearFilter}>
                <FontAwesomeIcon className="icon" icon={faTimes}></FontAwesomeIcon>
              </button>
            )}
            {state.province == "none" && !state.checkIn && !state.checkOut && !state.accommodate && (
              <button>
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}></FontAwesomeIcon>
              </button>
            )}
          </button>
        </StyledContainer>
      ) : (
        <StyledResizeNavTop onClick={click}>
          {/* <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          <FontAwesomeIcon className="icon" icon={faTimes} /> */}

          {(state.province != "none" || state.checkIn || state.checkOut || state.accommodate) && (
            <FontAwesomeIcon onClick={onClearFilter} className="icon" icon={faTimes} />
          )}
          {state.province == "none" && !state.checkIn && !state.checkOut && !state.accommodate && (
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          )}
          <div>
            {state.province == "none" && <p>Anywhere</p>}
            {state.province != "none" && <p>{provinceQuery.data.find((provinceItem) => provinceItem.code == state.province).full_name}</p>}
            <div className="flex-container">
              {!state.checkIn && <p>Any week</p>}
              {state.checkIn && (
                <p>
                  {formatDate(state.checkIn)} - {formatDate(state.checkOut)}
                </p>
              )}
              <p>-</p>
              {!state.accommodate && <p>Add guests</p>}
              {state.accommodate && <p>{state.accommodate} guests</p>}
            </div>
          </div>
        </StyledResizeNavTop>
      )}
    </>
  );
}
