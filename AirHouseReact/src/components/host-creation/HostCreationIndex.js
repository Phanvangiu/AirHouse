import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Route, Routes } from "react-router-dom";
import { Router } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import { useSearchParams } from "react-router-dom";
import { ReadPropertyUpdateQuery } from "api/propertyApi";

const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
`;

const StyledOption = styled.div`
  display: flex;
`;

const StyledOptionChoice = styled(Link)`
  padding: 20px;
  background-color: rgb(223, 219, 210);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: red;
  }
`;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_PROPERTY:
      return { ...state, propertyName: action.next };

    case ACTIONS.CHANGE_AMENITIES:
      return { ...state, amenities: action.next };
    case ACTIONS.CHANGE_DESCRIPTION:
      return { ...state, description: action.next };

    case ACTIONS.CHANGE_ABOUT_PLACE:
      return { ...state, aboutPlace: action.next };

    case ACTIONS.CHANGE_PLACE_GREAT_FOR:
      return { ...state, placeGreatFor: action.next };

    case ACTIONS.CHANGE_GUEST_ACCESS:
      return { ...state, guestAccess: action.next };

    case ACTIONS.CHANGE_INTERACTION_GUEST:
      return { ...state, interactionGuest: action.next };

    case ACTIONS.CHANGE_THING_TO_NOTE:
      return { ...state, thingToNote: action.next };

    case ACTIONS.CHANGE_OVERVIEW:
      return { ...state, overview: action.next };

    case ACTIONS.CHANGE_GETTING_AROUND:
      return { ...state, gettingAround: action.next };

    case ACTIONS.CHANGE_PROPERTY_TYPE:
      return { ...state, propertyTypeId: action.next };

    case ACTIONS.CHANGE_ROOM_TYPE:
      return { ...state, roomTypeId: action.next };

    case ACTIONS.CHANGE_PROVINCES:
      return { ...state, provinces_id: action.next };

    case ACTIONS.CHANGE_CATEGORY:
      return { ...state, categoryId: action.next };

    case ACTIONS.CHANGE_DISTRICT:
      return { ...state, district_id: action.next };

    case ACTIONS.CHANGE_ADDRESS:
      return { ...state, address: action.next };

    case ACTIONS.CHANGE_BEDROOM_COUNT:
      return { ...state, bedroomCount: action.next };

    case ACTIONS.CHANGE_BED_COUNT:
      return { ...state, bedCount: action.next };

    case ACTIONS.CHANGE_BATH_ROOM_COUNT:
      return { ...state, bathRoomCount: action.next };

    case ACTIONS.CHANGE_ACCOMODATES_COUNT:
      return { ...state, accomodatesCount: action.next };

    case ACTIONS.CHANGE_START_DATE:
      return { ...state, startDate: action.next };

    case ACTIONS.CHANGE_END_DATE:
      return { ...state, endDate: action.next };

    case ACTIONS.CHANGE_BASE_PRICE:
      return { ...state, baseprice: action.next };

    case ACTIONS.CHANGE_BOOKING_PER:
      return { ...state, bookingPer: action.next };

    case ACTIONS.CHANGE_BOOKING_TYPE:
      return { ...state, bookingType: action.next };

    case ACTIONS.CHANGE_CHECKIN:
      return { ...state, checkInAfter: action.next };

    case ACTIONS.CHANGE_CHECKOUT:
      return { ...state, checkOutBefore: action.next };

    case ACTIONS.CHANGE_CANCELATION:
      return { ...state, cancelation: action.next };

    case ACTIONS.CHANGE_STATUS:
      return { ...state, property_status: action.next };

    case ACTIONS.CHANGE_MAXIMUM_STAY:
      return { ...state, maximumStay: action.next };

    case ACTIONS.CHANGE_MINIMUM_STAY:
      return { ...state, minimumStay: action.next };

    case ACTIONS.CHANGE_IMAGES:
      return { ...state, images: action.next };

    case ACTIONS.CHANGE_VIDEO:
      return { ...state, video: action.next };

    case ACTIONS.CHANGE_EXCEPTION_DATE:
      return { ...state, exceptionDate: action.next };
  }
}

const ACTIONS = {
  CHANGE_PROPERTY: "CHANGE_PROPERTY",
  CHANGE_AMENITIES: "CHANGE_AMENITIES",
  CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
  CHANGE_ABOUT_PLACE: "CHANGE_ABOUT_PLACE",
  CHANGE_PLACE_GREAT_FOR: "CHANGE_PLACE_GREAT_FOR",
  CHANGE_GUEST_ACCESS: "CHANGE_GUEST_ACCESS",
  CHANGE_INTERACTION_GUEST: "CHANGE_INTERACTION_GUEST",
  CHANGE_THING_TO_NOTE: "CHANGE_THING_TO_NOTE",
  CHANGE_OVERVIEW: "CHANGE_OVERVIEW",
  CHANGE_GETTING_AROUND: "CHANGE_GETTING_AROUND",
  CHANGE_PROPERTY_TYPE: "CHANGE_PROPERTY_TYPE",
  CHANGE_ROOM_TYPE: "CHANGE_ROOM_TYPE",
  CHANGE_CATEGORY: "CHANGE_CATEGORY",
  CHANGE_PROVINCES: "CHANGE_PROVINCES",
  CHANGE_DISTRICT: "CHANGE_DISTRICT",
  CHANGE_ADDRESS: "CHANGE_ADDRESS",
  CHANGE_BEDROOM_COUNT: "CHANGE_BEDROOM_COUNT",
  CHANGE_BED_COUNT: "CHANGE_BED_COUNT",
  CHANGE_BATH_ROOM_COUNT: "CHANGE_BATH_ROOM_COUNT",
  CHANGE_ACCOMODATES_COUNT: "CHANGE_ACCOMODATES_COUNT",
  CHANGE_START_DATE: "CHANGE_START_DATE",
  CHANGE_END_DATE: "CHANGE_END_DATE",
  CHANGE_BASE_PRICE: "CHANGE_BASE_PRICE",
  CHANGE_BOOKING_PER: "CHANGE_BOOKING_PER",
  CHANGE_BOOKING_TYPE: "CHANGE_BOOKING_TYPE",
  CHANGE_CHECKIN: "CHANGE_CHECKIN",
  CHANGE_CHECKOUT: "CHANGE_CHECKOUT",
  CHANGE_CANCELATION: "CHANGE_CANCELATION",
  CHANGE_STATUS: "CHANGE_STATUS",
  CHANGE_MAXIMUM_STAY: "CHANGE_MAXIMUM_STAY",
  CHANGE_MINIMUM_STAY: "CHANGE_MINIMUM_STAY",
  CHANGE_IMAGES: "CHANGE_IMAGES",
  CHANGE_VIDEO: "CHANGE_VIDEO",
  CHANGE_EXCEPTION_DATE: "CHANGE_EXCEPTION_DATE",
};

export default function HostCreationIndex() {
  const [state, dispatch] = useReducer(reducer, {
    propertyName: "",
    amenities: [],
    description: "",
    aboutPlace: "",
    placeGreatFor: "",
    guestAccess: "",
    interactionGuest: "",
    thingToNote: "",
    overview: "",
    gettingAround: "",
    propertyTypeId: 0,
    roomTypeId: 0,
    categoryId: 0,
    provinces_id: "01",
    district_id: 0,
    address: "",
    bedroomCount: 1,
    bathRoomCount: 0,
    accomodatesCount: 1,
    startDate: "",
    endDate: "",
    baseprice: 0,
    bookingType: "review",
    checkInAfter: "02PM",
    checkOutBefore: "12AM",
    minimumStay: 0,
    maximumStay: 0,
    property_status: false,
    images: [],
    video: "",
    exceptionDate: [],
  });

  const navigate = useNavigate();
  const initialArr = Array(9).fill(false);

  const [active, setActive] = useState(initialArr);
  const [available, setAvailable] = useState(initialArr);

  const onSetActive = (index) => {
    const newArr = Array(9).fill(false);
    newArr[index] = true;

    const url = ["basic", "description", "details", "location", "amenities", "photo", "pricing", "booking", "calendar"];
    setActive(newArr);
    window.scrollTo(0, 0);
    navigate("content/" + url[index]);
  };

  const onSetAvailable = (index) => {
    const newArr = [...available];
    newArr[index] = true;
    setAvailable(newArr);
  };

  useBeforeunload(() => "You’ll lose your data!");

  let location = useLocation();

  useEffect(() => {
    if (JSON.stringify(initialArr) === JSON.stringify(available)) {
      navigate("/user/host-creation/become-host");
    }
  }, []);

  return (
    <>
      <StyledContainer>
        <Outlet context={[state, dispatch, ACTIONS, onSetAvailable, onSetActive, active, available]} />
      </StyledContainer>
    </>
  );
}
