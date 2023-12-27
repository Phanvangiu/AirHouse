import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import CalendarViewHost from "./CalendarViewHost";
import Calendar from "react-calendar";
import { faAngleUp, faChevronDown, faPlus, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { CreateBookingMutation } from "api/userBookingApi";
import { CreateTransactionMutation } from "api/transactionApi";
import { useNavigate } from "react-router-dom";
import { UserQuery } from "api/userApi";

const StyledContainer = styled.div`
  position: relative;
  font-size: 15px;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  padding: 20px 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledPrice = styled.span`
  font-size: 19px;
  font-weight: 600;

  & span {
    font-size: 16px;
    font-weight: 300;
  }
`;
const StyledBooking = styled.div`
  border: 1px solid #dddddd;
  border-radius: 5px;
`;
const StyledCheck = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;

  > div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
const StyledCheckin = styled.div`
  border-right: 1px solid black;
  & span:nth-of-type(1) {
    font-weight: 600;
    font-size: 14px;
  }

  & span:nth-of-type(2) {
    font-size: 13px;
  }
`;

const StyledCheckOut = styled.div`
  & span:nth-of-type(1) {
    font-weight: 600;
    font-size: 14px;
  }

  & span:nth-of-type(2) {
    font-size: 13px;
  }
`;

const StyledCountGuest = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  cursor: pointer;
  flex-direction: column;
  gap: 10px;

  & span {
    font-weight: 600;
  }

  & p {
    font-size: 13px;
  }

  & div {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledButton = styled.button`
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background-color: #e51d50;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const StyledCalendar = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const StyledGuest = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #dddddd;
  border-radius: 5px;
  z-index: 10;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  transform: translate(5px, 3.6rem);
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

const StyledDetailText = styled.div`
  text-align: center;
`;

const StyledDetailContent = styled.div`
  .container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .content {
    font-size: 13px;
    padding: 15px 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
`;

const StyledTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  > span:nth-of-type(1) {
    font-weight: 600;
  }
`;

const TotalBeforeTaxes = ({ data, value, setValue, onHandleChange, disabledBookDate }) => {
  const navigate = useNavigate();
  const createBooking = CreateBookingMutation();
  const createTransaction = CreateTransactionMutation();
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [guest, setGuest] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(1);
  const userQuery = UserQuery();

  const handleClickDropdown = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  const { start_date, end_date, minimum_stay, maximum_stay } = data;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const calBookedLength = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000;

    return Math.floor((end - start) / oneDay);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (value[0] == null || value[1] == null) {
      alert("Please choose checkin and checkout day");
      return;
    }

    const formData = new FormData();
    formData.append("property_id", data.id);
    formData.append("check_in_date", formatDate(new Date(value[0])));
    formData.append("check_out_date", formatDate(new Date(value[1])));
    formData.append("base_price", data.base_price);
    const bookedLength = calBookedLength(new Date(value[0]), new Date(value[1]));
    formData.append("total", data.base_price * bookedLength);
    formData.append("site_fees", (data.base_price * bookedLength * 0.06).toFixed(2));
    formData.append("booking_date", formatDate(new Date()));
    formData.append("total_person", guest);
    createBooking.mutate(formData, {
      onSuccess: (data) => {
        alert("success");
        navigate("/user/payment?booking_id=" + data.id);
      },
      onError: (error) => {},
    });
  };

  useEffect(() => {
    const button = document.querySelector(".click-box");

    function onMouseDown(ev) {
      if (containerRef.current && !containerRef.current.contains(ev.target) && !button.contains(ev.target)) {
        setShowText(false);
      }
    }

    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <StyledContainer>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={handleClose}
        >
          <StyledCalendar onClick={handleCalendarClick}>
            <Calendar
              onChange={onHandleChange}
              tileDisabled={disabledBookDate}
              allowPartialRange={true}
              selectRange={true}
              returnValue={"range"}
              view={"month"}
              minDate={new Date(start_date) - new Date() > 0 ? new Date(start_date) : new Date()}
              maxDate={new Date(end_date)}
              maxDetail={"month"}
              value={value}
              data={data}
            />
          </StyledCalendar>
        </div>
      )}
      <StyledPrice>
        $ {data.base_price} / <span>night</span>
      </StyledPrice>

      <StyledBooking>
        <StyledCheck>
          <StyledCheckin onClick={handleClick}>
            <span>Checkin</span>
            <span> {value?.[0] ? formatDate(value[0]) : <p>mm-dd-yy</p>}</span>
          </StyledCheckin>

          <StyledCheckOut onClick={handleClick}>
            <span>Checkout</span>

            <span>
              {value?.[0] == null && value?.[1] == null && <p>mm-dd-yy</p>}
              {value?.[0] != null && value?.[1] == null && <p>mm-dd-yy</p>}
              {value?.[0] != null && value?.[1] != null && formatDate(value[1])}
            </span>
          </StyledCheckOut>
        </StyledCheck>
        {showText && (
          <StyledGuest ref={containerRef} className="click-box">
            <StyledAdultChildren>
              <div>Adults</div>
              <div>
                <StyledAddSub
                  onClick={() => {
                    if (adult != 1) {
                      setAdult(adult - 1);
                      setGuest(guest - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faSubtract} />
                </StyledAddSub>
                {adult}
                <StyledAddSub
                  onClick={() => {
                    if (guest < data.accomodates_count) {
                      setAdult(adult + 1);
                      setGuest(guest + 1);
                    } else {
                      alert(`maximum guest is ${data.accomodates_count}`);
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
                    if (children != 0) {
                      setChildren(children - 1);
                      setGuest(guest - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faSubtract} />
                </StyledAddSub>
                {children}
                <StyledAddSub
                  onClick={() => {
                    if (guest < data.accomodates_count) {
                      setChildren(children + 1);
                      setGuest(guest + 1);
                    } else {
                      alert(`maximum guest is ${data.accomodates_count}`);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </StyledAddSub>
              </div>
            </StyledAdultChildren>
          </StyledGuest>
        )}
        <StyledCountGuest className="click-box" onClick={handleClickDropdown}>
          <div>
            <span>Guests</span>
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </div>
          <p>{guest} Guest</p>
        </StyledCountGuest>
      </StyledBooking>
      {userQuery.isError && <p>Please login first</p>}
      <StyledButton disabled={!value?.[1] || userQuery.isError} onClick={onSubmit}>
        Continue
      </StyledButton>
      <StyledDetailText>You'll be able to review before paying.</StyledDetailText>
      <StyledDetailContent>
        {value?.[0] && value?.[1] && (
          <div className="container">
            <div className="content">
              <span>
                {formatDate(value[0])} to {formatDate(value[1])}
              </span>
              <span>$ {data.base_price * calBookedLength(value[0], value[1])}</span>
            </div>
            <div className="content">
              <span>{calBookedLength(value[0], value[1]) + 1} night</span>
            </div>
            <div className="content">
              <span>{guest} guest</span>
            </div>
            <div className="content">
              <span>Site fees</span>
              <span>$ {(data.base_price * calBookedLength(value[0], value[1]) * 0.06).toFixed(2)} </span>
            </div>
          </div>
        )}
      </StyledDetailContent>
      <StyledTotal>
        <span>Total</span>
        <span>
          $
          {value?.[0] && value?.[1]
            ? data.base_price * calBookedLength(value[0], value[1]) + data.base_price * calBookedLength(value[0], value[1]) * 0.06
            : 0}
        </span>
      </StyledTotal>
    </StyledContainer>
  );
};

export default TotalBeforeTaxes;
