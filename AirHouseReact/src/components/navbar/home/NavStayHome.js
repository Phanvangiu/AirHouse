import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useStateContext } from "contexts/ContextProvider";
import { useState } from "react";
import StyledButtonContainer from "../../../ui/StyledButtonContainer";
import StyledButtonBoxContainer from "ui/StyledButtonBoxContainer";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ProvinceQuery } from "api/locationApi";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./calendar.css";

const StyledContainer = styled(motion.div)`
  font-family: "Poppins", sans-serif;
  border-radius: 50px;
  border: 0;
  background-color: white;
  cursor: pointer;
  width: 50rem;
  display: grid !important;
  grid-template-columns: 2fr 1fr 1fr 2fr !important;
  margin-bottom: 1rem;
  margin-top: 0.2rem;
  background-color: #ebebeb;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  & .button {
    text-align: left;
    padding: 1rem;
    font-size: 14px;
    box-shadow: none;
    background-color: #ebebeb;

    & p:nth-of-type(1) {
      margin-bottom: 5px;
      font-weight: 600;
    }
  }

  & .button:hover {
    background-color: #ebebeb;
    /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: white;
  }

  & .close {
    border: 0;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: #afafaf;
    }
  }

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

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr !important;
    border-radius: none;
    & .button {
      border-radius: none;
    }
  }
`;

const StyledWhere = styled(StyledButtonBoxContainer)`
  flex-grow: 2;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    if (props.$click) {
      return css`
        background-color: white !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
      `;
    }
  }}
`;

const StyledCheckIn = styled(StyledButtonBoxContainer)`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    if (props.$click) {
      return css`
        background-color: white !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
      `;
    }
  }}
`;

const StyledCheckOut = styled(StyledButtonBoxContainer)`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    if (props.$click) {
      return css`
        background-color: white !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
      `;
    }
  }}
`;

const StyledWho = styled(StyledButtonBoxContainer)`
  flex-grow: 2;
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

  ${(props) => {
    if (props.$click) {
      return css`
        background-color: white !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
      `;
    }
  }}
`;

const StyledWherePopUp = styled.div`
  position: absolute;
  top: 5rem;
  width: 100%;
  background-color: white;
  height: 15rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & select {
    width: 100%;
    height: 2rem;
    border: 1px solid red;
    border-radius: 5px;
    &:focus,
    &:hover {
      border: 1px solid red;
      outline: 1px solid red;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 14px;
  }

  @media only screen and (max-width: 800px) {
    transform: translate(-1rem, 13.5rem);
    border-radius: none;
  }
`;

const StyledDatePopUp = styled.div`
  position: absolute;
  top: 5rem;
  width: 100%;
  transform: translateX(-34%);

  @media only screen and (max-width: 800px) {
    transform: translate(-1rem, 13.5rem);
    border-radius: none;
  }
`;

const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSearchButton = styled.button`
  background-color: red;
  border-radius: 20px;
  display: flex;
  align-items: center;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const StyledAccommodate = styled.div`
  position: absolute;
  top: 5rem;
  width: 40%;
  background-color: white;
  border-radius: 15px;

  @media only screen and (max-width: 800px) {
    transform: translate(-1rem, 13.5rem);
    border-radius: none;
    width: 100%;
  }
`;

const StyledGuest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 5px;
  padding: 1rem;
`;

const StyledAdultChildren = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dddddd;

  > div:nth-of-type(1) {
    font-weight: 600;
    font-size: 14px;
  }
`;

const StyledAddSub = styled.span`
  font-size: 10px;
  padding: 0px 12px;
  cursor: pointer;
`;

function formatDateToString(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function NavStayHome({ isShow }) {
  const provinceQuery = ProvinceQuery();
  const { state, dispatch, ACTIONS } = useStateContext();
  const [clickDate, setClickDate] = useState(false);
  const [clickGuest, setClickGuest] = useState(false);
  const [dateValue, setDateValue] = useState([]);
  const [active, setActive] = useState([false, false, false]);

  const [province, setProvince] = useState("none");

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const changeActive = (index) => {
    const newActive = [false, false, false];
    newActive[index] = true;
    setActive(newActive);
  };

  const onClickClearDate = () => {
    setDateValue([]);
  };

  const onChangeDate = (date) => {
    setDateValue(date);
  };

  const onClickSearch = (ev) => {
    ev.stopPropagation();

    dispatch({ type: ACTIONS.CHANGE_PROVINCE, next: province });
    dispatch({ type: ACTIONS.CHANGE_CHECK_IN, next: dateValue[0] });
    if (dateValue[1]) {
      dispatch({ type: ACTIONS.CHANGE_CHECK_OUT, next: dateValue[1] });
    } else {
      dispatch({ type: ACTIONS.CHANGE_CHECK_OUT, next: dateValue[0] });
    }

    dispatch({ type: ACTIONS.CHANGE_ACCOMMODATE, next: adultCount + childrenCount });
  };

  useEffect(() => {
    return () => {
      setActive([false, false, false]);
    };
  }, []);

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
      <StyledWhere $click={active[0]} onClick={() => changeActive(0)} className="button">
        <StyledOption>
          <p>Where</p>
          {province == "none" && <p>Search destinations</p>}
          {province != "none" && <p>{provinceQuery.data.find((provinceItem) => provinceItem.code == province).full_name}</p>}
        </StyledOption>
        {province != "none" && (
          <button onClick={() => setProvince("none")} className="close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        {active[0] && (
          <StyledWherePopUp>
            <h3>Search By Province</h3>
            <select value={province} onChange={(ev) => setProvince(ev.target.value)}>
              <option>None</option>
              {provinceQuery.data.map((province, index) => {
                return (
                  <option key={index} value={province.code}>
                    {province.full_name}
                  </option>
                );
              })}
            </select>
          </StyledWherePopUp>
        )}
      </StyledWhere>
      <StyledCheckIn onClick={() => changeActive(1)} $click={active[1]} className="button">
        <StyledOption>
          <p>Check in</p>
          {!dateValue[0] && <p>Add dates</p>}
          {dateValue[0] && <p>{formatDateToString(dateValue[0])}</p>}
        </StyledOption>
        {dateValue[0] && (
          <button onClick={onClickClearDate} className="close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        {(active[1] || active[2]) && (
          <StyledDatePopUp>
            <Calendar
              onChange={onChangeDate}
              value={dateValue}
              allowPartialRange={true}
              selectRange={true}
              returnValue={"range"}
              view={"month"}
              minDate={new Date()}
            />
          </StyledDatePopUp>
        )}
      </StyledCheckIn>
      <StyledCheckOut onClick={() => changeActive(2)} $click={active[2]} className="button">
        <StyledOption>
          <p>Check out</p>
          {!dateValue[1] && <p>Add dates</p>}
          {dateValue[1] && <p>{formatDateToString(dateValue[1])}</p>}
        </StyledOption>
        {dateValue[1] && (
          <button onClick={onClickClearDate} className="close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </StyledCheckOut>
      <StyledWho onClick={() => changeActive(3)} $click={active[3]} className="button">
        <StyledOption>
          <p>Who</p>
          <p>Add guests</p>
        </StyledOption>
        <StyledSearchButton onClick={onClickSearch}>
          Search <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </StyledSearchButton>
        {active[3] && (
          <StyledAccommodate>
            <StyledGuest>
              <StyledAdultChildren>
                <div>Adults</div>
                <div>
                  <StyledAddSub
                    onClick={() => {
                      if (adultCount > 1) {
                        setAdultCount(adultCount - 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faSubtract} />
                  </StyledAddSub>
                  {adultCount}
                  <StyledAddSub
                    onClick={() => {
                      if (adultCount + childrenCount < 16) {
                        setAdultCount(adultCount + 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </StyledAddSub>
                </div>
              </StyledAdultChildren>
              <StyledAdultChildren>
                <div>Childrens</div>
                <div>
                  <StyledAddSub
                    onClick={() => {
                      if (childrenCount > 0) {
                        setChildrenCount(childrenCount - 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faSubtract} />
                  </StyledAddSub>
                  {childrenCount}
                  <StyledAddSub
                    onClick={() => {
                      if (adultCount + childrenCount < 16) {
                        setChildrenCount(childrenCount + 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </StyledAddSub>
                </div>
              </StyledAdultChildren>
            </StyledGuest>
          </StyledAccommodate>
        )}
      </StyledWho>
    </StyledContainer>
  );
}
