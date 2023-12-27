import React from "react";
import { useEffect, useState, useRef, useReducer } from "react";
import styled, { css } from "styled-components";
import StatusAll from "./StatusAll";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { CategoryQuery } from "api/categoryApi";
import { PropertyTypeQuery } from "api/property-typeApi";
import { RoomTypeQuery } from "api/room-typeApi";

const StyledContainer = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 7px;
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  min-height: 80vh;
`;

const StyledContent = styled.div``;

const StyledHeader = styled.div`
  display: flex;
  gap: 1rem;
  transition: all 1s;
  border-bottom: 2px solid #e3e9ed;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-bottom: 2px solid white;
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 10px;

  ${(props) => {
    if (props.$active == true) {
      return css`
        border-bottom: 2px solid blue;
      `;
    }
  }}
`;

const StyledFilterSearch = styled.div`
  margin: 1.3rem 0;
  display: flex;
  gap: 1rem;
  height: 2.5rem;
  flex-wrap: wrap;

  & .down {
    flex-grow: 1;
    display: flex;
    border: 1px solid black;
    align-items: center;
    border-radius: 5px;

    & .search-icon {
      height: 1.2rem;
      width: 2.5rem;
      color: rgba(0, 0, 0, 0.5);
    }

    & input {
      flex-grow: 1;
      border: none;
    }

    & input:hover,
    & input:focus {
      border: none;
      outline: none;
    }
  }

  & .down:hover,
  & .down:focus {
    border: 1px solid rgba(0, 0, 255, 0.5);
    outline: 1px solid rgba(0, 0, 255, 0.5);
  }

  & .top {
    width: 5rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }

  & .top:hover,
  & .top:focus {
    border: 1px solid rgba(0, 0, 255, 0.5);
    outline: 1px solid rgba(0, 0, 255, 0.5);
  }
`;

const StyledContentBody = styled.div``;

const StyledFilterShow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  & span {
    background-color: #d3d3d3;
    padding: 2px 5px;
    border-radius: 5px;

    & button {
      background-color: #d3d3d3;
      border: none;
      padding: 0;
      border-radius: 50%;
      margin-left: 5px;
    }
  }
`;

const ACTIONS = {
  FILTER_SEARCH: "SEARCH",
  FILTER_CATEGORY: "CATEGORY",
  FILTER_ROOMTYPE: "ROOMTYPE",
  FILTER_PROPERTY_TYPE: "PROPERTY_TYPE",
  FILTER_ACCOMODATES: "ACCOMODATES",
  FILTER_BED_ROOM: "BED_ROOM",
  FILTER_BOOKING_TYPE: "BOOKING_TYPE",
  FILTER_STATUS: "STATUS",
};

export default function Status() {
  const [active, setActive] = useState([true, false, false, false]);

  const categoryQuery = CategoryQuery();
  const roomTypeQuery = RoomTypeQuery();
  const propertyQuery = PropertyTypeQuery();
  const [status, setStatus] = useState("all");

  const [clickFilter, setClickFilter] = useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.FILTER_SEARCH:
        return { ...state, search: action.next };

      case ACTIONS.FILTER_CATEGORY:
        return { ...state, category: action.next };

      case ACTIONS.FILTER_ROOMTYPE:
        return { ...state, roomType: action.next };

      case ACTIONS.FILTER_PROPERTY_TYPE:
        return { ...state, propertyType: action.next };

      case ACTIONS.FILTER_ACCOMODATES:
        return { ...state, accomodates: action.next };

      case ACTIONS.FILTER_BED_ROOM:
        return { ...state, bedroom: action.next };

      case ACTIONS.FILTER_BOOKING_TYPE:
        return { ...state, bookingType: action.next };

      case ACTIONS.FILTER_STATUS:
        return { ...state, status: action.next };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    search: "",
    category: null,
    roomType: null,
    propertyType: null,
    accomodates: null,
    bedroom: null,
    bookingType: null,
    status: null,
  });

  const onSetActive = (index) => {
    const newActive = Array(4).fill(false);
    newActive[index] = true;

    if (JSON.stringify(active) == JSON.stringify(newActive)) {
      return;
    }

    setActive(newActive);

    if (index == 0) {
      setStatus("all");
    }

    if (index == 1) {
      setStatus("waiting");
    }

    if (index == 2) {
      setStatus("deny");
    }

    if (index == 3) {
      setStatus("accept");
    }
  };

  return (
    <StyledContainer>
      <StyledContent>
        <StyledHeader>
          <StyledButton onClick={() => onSetActive(0)} $active={active[0]}>
            All Properties
          </StyledButton>
          <StyledButton onClick={() => onSetActive(1)} $active={active[1]}>
            In Waiting
          </StyledButton>
          <StyledButton onClick={() => onSetActive(2)} $active={active[2]}>
            Error
          </StyledButton>
          <StyledButton onClick={() => onSetActive(3)} $active={active[3]}>
            Sucess
          </StyledButton>
        </StyledHeader>
        <StyledFilterSearch>
          {clickFilter && <FilterPopUp state={state} dispatch={dispatch} setClickFilter={setClickFilter} />}
          <button className="top" onClick={() => setClickFilter(!clickFilter)}>
            <FontAwesomeIcon icon={faSort} className="search-icon" /> Filter
          </button>
          <div className="down">
            <span>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </span>
            <input value={state.search} onChange={(ev) => dispatch({ type: ACTIONS.FILTER_SEARCH, next: ev.target.value })} type="search" />
          </div>
        </StyledFilterSearch>
        <StyledFilterShow>
          {state.category && (
            <span>
              category is {categoryQuery.data.filter((item) => item.id == state.category)[0].name}{" "}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_CATEGORY, next: null })}>x</button>
            </span>
          )}
          {state.roomType && (
            <span>
              Room type is {roomTypeQuery.data.filter((item) => item.id == state.roomType)[0].name}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_ROOMTYPE, next: null })}>x</button>
            </span>
          )}
          {state.propertyType && (
            <span>
              Property type is {propertyQuery.data.filter((item) => item.id == state.propertyType)[0].name}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_PROPERTY_TYPE, next: null })}>x</button>
            </span>
          )}
          {state.accomodates && (
            <span>
              Accomodates is {state.accomodates}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_ACCOMODATES, next: null })}>x</button>
            </span>
          )}
          {state.bedroom && (
            <span>
              Bedroom is {state.bedroom}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_BED_ROOM, next: null })}>x</button>
            </span>
          )}
          {state.bookingType && (
            <span>
              Booking type is {state.bookingType}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_BOOKING_TYPE, next: null })}>x</button>
            </span>
          )}
          {state.status && (
            <span>
              Status is {Number(state.status) == 1 ? "available" : "not available"}
              <button onClick={() => dispatch({ type: ACTIONS.FILTER_STATUS, next: null })}>x</button>
            </span>
          )}
        </StyledFilterShow>
        <StyledContentBody>
          <StatusAll status={status} filterState={state} />
        </StyledContentBody>
      </StyledContent>
    </StyledContainer>
  );
}

const StyledFilterPopUp = styled(motion.div)`
  position: absolute;
  width: 15rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px;
  border-radius: 5px;
  transform: translateY(24%);
  z-index: 999;

  & select {
    height: 2rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 100%;
  }
`;

function FilterPopUp({ setClickFilter, state, dispatch }) {
  const categoryQuery = CategoryQuery();
  const propertyTypeQuery = PropertyTypeQuery();
  const roomTypeQuery = RoomTypeQuery();
  const accomodatesArr = Array(16).fill(0);
  const bedRoomArr = Array(10).fill(0);
  const [value, setValue] = useState(null);

  for (let i = 1; i <= 16; i++) {
    accomodatesArr[i - 1] = i;
    if (i <= 10) {
      bedRoomArr[i - 1] = i;
    }
  }

  const [selected, setSelected] = useState(1);

  const containerRef = useRef();

  useEffect(() => {
    const button = document.querySelector(".top");

    function onMouseDropDown(ev) {
      if (containerRef.current && !containerRef.current.contains(ev.target) && !button.contains(ev.target)) {
        setClickFilter(false);
      }
    }

    window.addEventListener("mousedown", onMouseDropDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDropDown);
    };
  }, [categoryQuery.status, propertyTypeQuery.status, roomTypeQuery.status]);

  const onFilter = () => {
    const value = document.querySelector(".filter-value");

    if (selected == 1) {
      dispatch({ type: ACTIONS.FILTER_CATEGORY, next: value.value });
      return;
    }

    if (selected == 2) {
      dispatch({ type: ACTIONS.FILTER_PROPERTY_TYPE, next: value.value });
      return;
    }

    if (selected == 3) {
      dispatch({ type: ACTIONS.FILTER_ROOMTYPE, next: value.value });
      return;
    }

    if (selected == 4) {
      dispatch({ type: ACTIONS.FILTER_ACCOMODATES, next: value.value });
      return;
    }

    if (selected == 5) {
      dispatch({ type: ACTIONS.FILTER_BED_ROOM, next: value.value });
      return;
    }

    if (selected == 6) {
      dispatch({ type: ACTIONS.FILTER_BOOKING_TYPE, next: value.value });
      return;
    }

    if (selected == 7) {
      dispatch({ type: ACTIONS.FILTER_STATUS, next: value.value });
      return;
    }
  };

  return (
    <StyledFilterPopUp
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.1,
      }}
      ref={containerRef}
    >
      <div>
        <label>Filter based on</label>
        <select value={selected} onChange={(ev) => setSelected(ev.target.value)}>
          <option value={1}>Category</option>
          <option value={2}>Property type</option>
          <option value={3}>Room type</option>
          <option value={4}>Accommodate</option>
          <option value={5}>Bed room</option>
          <option value={6}>BookingType</option>
          <option value={7}>Status</option>
        </select>
      </div>
      <div>
        <label>Is</label>
        {selected == 1 && (
          <select className="filter-value">
            {categoryQuery.isSuccess &&
              categoryQuery.data.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              ))}
          </select>
        )}
        {selected == 2 && (
          <select className="filter-value">
            {propertyTypeQuery.isSuccess &&
              propertyTypeQuery.data.map((property, index) => (
                <option value={property.id} key={index}>
                  {property.name}
                </option>
              ))}
          </select>
        )}
        {selected == 3 && (
          <select className="filter-value">
            {roomTypeQuery.isSuccess &&
              roomTypeQuery.data.map((roomType, index) => (
                <option value={roomType.id} key={index}>
                  {roomType.name}
                </option>
              ))}
          </select>
        )}
        {selected == 4 && (
          <select className="filter-value">
            {accomodatesArr.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        )}
        {selected == 5 && (
          <select className="filter-value">
            {bedRoomArr.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        )}
        {selected == 6 && (
          <select className="filter-value">
            <option value={"review"}>Review</option>
            <option value={"instantly"}>Instantly</option>
          </select>
        )}
        {selected == 7 && (
          <select className="filter-value">
            <option value={1}>Available</option>
            <option value={0}>Not available</option>
          </select>
        )}
      </div>
      <div>
        <button onClick={onFilter}>Filter</button>
      </div>
    </StyledFilterPopUp>
  );
}
