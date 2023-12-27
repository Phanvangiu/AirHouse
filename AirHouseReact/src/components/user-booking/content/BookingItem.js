import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Box = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  grid-auto-rows: 12.5rem;

  column-gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 10px;
  line-height: 20px;

  & .item1 {
    width: 100%;
    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  & .property-image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & .booking-item .grid-container .user-image {
    max-width: 100px;
    border-radius: 50px;
  }

  & .item2 {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & .bar {
      margin-right: 10px;
    }

    & .to {
      font-weight: 700;
    }

    & p:nth-of-type(2) {
      font-size: 15px;
    }

    & p:nth-of-type(3) {
      font-size: 15px;
    }
  }

  & .item3 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .booking-item .grid-container .item3 .name-user-property {
    padding: 5px;
  }

  & .item3-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    & p:nth-of-type(1) {
      font-weight: 600;
      font-size: 14px;
    }

    & button {
      cursor: pointer;
      background-color: red;
      border: none;
      color: white;
      border-radius: 5px;
    }
  }
`;

const StyledAlert = styled.h4`
  color: red;
`;
export default function BookingItem(props) {
  const navigate = useNavigate();

  const onCompletePayment = (bookingID) => {
    navigate("/user/payment?booking_id=" + bookingID);
  };

  return (
    <Box>
      <div className="item1">
        <img className="property-image" src={props.BookingItem.image} />
      </div>
      <div className="item2">
        <p style={{ fontWeight: "bold" }}>
          {props.BookingItem.id} - {props.BookingItem.Property_Name}
        </p>
        <p>
          <FontAwesomeIcon className="bar" icon={faLocationDot} />
          {props.BookingItem.province}, {props.BookingItem.districts}, {props.BookingItem.Property_Address}
        </p>
        <p>
          <FontAwesomeIcon className="bar" icon={faAddressBook} />
          {props.BookingItem.check_in_date} <span className="to">to</span> {props.BookingItem.check_out_date}
        </p>
        {props.BookingItem.status == "accepted" && (
          <StyledAlert>Booking will be expired after 24 hours from {props.BookingItem.created_at}</StyledAlert>
        )}
      </div>
      <div className="item3">
        <div className="item3-item">
          <Avatar src={props.BookingItem.user_image} size="40px" textSizeRatio={2} round={true} name={props.BookingItem.user_firstName} />
          <p className="name-user-property">
            {props.BookingItem.user_firstName} {props.BookingItem.user_lastName}
          </p>
          {props.BookingItem.status == "accepted" && (
            <button onClick={() => onCompletePayment(props.BookingItem.id)}>Finish Payment</button>
          )}
          <div className="Link">
            <button
              onClick={() => {
                navigate("/user/chat/", {
                  replace: false,
                  state: {
                    user_Email: props.BookingItem.user_Email,
                    first_Name: props.BookingItem.user_firstName,
                    last_Name: props.BookingItem.user_lastName,
                  },
                });
              }}
            >
              SendMessage
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}

const StyledImageSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;

export const BookingItemSkeleton = () => {
  return (
    <Box>
      <div className="item1">
        <StyledImageSkeleton />
      </div>
      <div className="item2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className="item3">
        <div className="item3-item">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </Box>
  );
};
