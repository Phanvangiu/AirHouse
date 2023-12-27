import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const StateContext = createContext({
  pageWidth: window.innerWidth,
  setPageWidth: () => {},
  chosenProperty: null,
  setChosenProperty: () => {},
  showLogin: null,
  onShowLoginHandler: () => {},
  ACTIONS: null,
  state: null,
  dispatch: () => {},
});

const ACTIONS = {
  CHANGE_PROVINCE: "CHANGE_PROVINCE",
  CHANGE_DISTRICT: "CHANGE_DISTRICT",
  CHANGE_CHECK_IN: "CHANGE_CHECK_IN",
  CHANGE_CHECK_OUT: "CHANGE_CHECK_OUT",
  CHANGE_ACCOMMODATE: "CHANGE_ACCOMMODATE",
  CHANGE_ROOM_TYPE: "CHANGE_ROOM_TYPE",
  CHANGE_PRICE_RANGE: "CHANGE_PRICE_RANGE",
  CHANGE_BED_ROOM: "CHANGE_BED_ROOM",
  CHANGE_BATH_ROOM: "CHANGE_BATH_ROOM",
  CHANGE_PROPERTY_TYPE: "CHANGE_PROPERTY_TYPE",
  CHANGE_AMENTITIES: "CHANGE_AMENTITIES",
  CHANGE_BOOK_OPTION: "CHANGE_BOOK_OPTION",
  CHANGE_RANGE: "CHANGE_RANGE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_PROVINCE:
      return { ...state, province: action.next };

    case ACTIONS.CHANGE_DISTRICT:
      return { ...state, district: action.next };

    case ACTIONS.CHANGE_CHECK_IN:
      return { ...state, checkIn: action.next };

    case ACTIONS.CHANGE_CHECK_OUT:
      return { ...state, checkOut: action.next };

    case ACTIONS.CHANGE_ACCOMMODATE:
      return { ...state, accommodate: action.next };

    case ACTIONS.CHANGE_ROOM_TYPE:
      return { ...state, roomType: action.next };

    case ACTIONS.CHANGE_BED_ROOM:
      return { ...state, bedRoom: action.next };

    case ACTIONS.CHANGE_BATH_ROOM:
      return { ...state, bathRoom: action.next };

    case ACTIONS.CHANGE_PROPERTY_TYPE:
      return { ...state, propertyType: action.next };

    case ACTIONS.CHANGE_AMENTITIES:
      return { ...state, amenities: action.next };
  }
}

export const ContextProvider = ({ children }) => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [chosenProperty, setChosenProperty] = useState();
  const [clickFilter, setClickFilter] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    province: "none",
    checkIn: null,
    checkOut: null,
    accommodate: null,
    roomType: "any",
    bedRoom: "any",
    bathRoom: "any",
    propertyType: "any",
    amenities: [],
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setPageWidth(window.innerWidth);
    });
  }, []);

  return (
    <StateContext.Provider
      value={{
        pageWidth,
        chosenProperty,
        setChosenProperty,
        state,
        dispatch,
        ACTIONS,
        clickFilter,
        setClickFilter,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
