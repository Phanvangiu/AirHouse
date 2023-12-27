import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { PropertyBookingQuery } from "api/userBookingApi";
import { useSearchParams } from "react-router-dom";
import Calendar from "react-calendar";
import Avatar from "react-avatar";
import Loading from "components/Loading";
import "./calendar.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyQuery } from "api/propertyApi";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import PopUpContainer from "ui/PopUpContainer";
import { DenyBookingMutation } from "api/userBookingApi";
import { useQueryClient } from "@tanstack/react-query";
import { AcceptBookingMutation } from "api/userBookingApi";

const StyledPopUp = styled(PopUpContainer)`
  width: 50rem;
  height: 25rem;
  padding: 1rem;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 3rem;
`;

const StyledCalender = styled(Calendar)`
  align-self: center;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledHeader = styled.div``;

const StyledButton = styled.button`
  transition: all 0.1s;
  background-color: white;
  border: none;
  border-bottom: 2px solid white;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;

  ${(props) => {
    if (props.$styled == true) {
      return css`
        border-bottom: 2px solid red;
      `;
    }
  }}
`;

const StyledContentBody = styled.div`
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledBooking = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 1rem;
  align-items: center;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.01);
  }

  > div:nth-of-type(1) {
    text-align: center;
  }

  & .second {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & .icon {
    margin-right: 0.5rem;
    font-size: 15px;
    color: red;
  }

  h3 {
    font-size: 17px;
    font-weight: 600;
  }

  & .to {
    font-weight: 600;
  }

  & .overlay {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  & button {
    background-color: red;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
  }

  & button:disabled {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
  transition: all 0.5s;

  & button {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 25%;
    cursor: pointer;
  }

  & .arrow {
    height: 1rem;
  }

  & .active {
    border: 2px solid rgba(0, 0, 255, 0.6);
  }

  & span {
    font-size: 17px;
  }
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLeftHeader = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  width: max-content;
  padding: 10px 1.3rem;
  gap: 1rem;
  border-radius: 5px;

  & p {
    font-weight: 600;
    font-size: 14px;
  }
`;

const formatDate = (dateObj) => {
  if (dateObj.getTime() == 0) {
    return null;
  }

  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
};

export default function BookingDetail() {
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const [serachParam, setserachParam] = useSearchParams();
  const [inputCheck, setInputCheck] = useState(true);
  const propertyQuery = PropertyQuery(serachParam.get("property_id"));
  const [value, setValue] = useState([]);
  const [active, setActive] = useState([true, false, false, false]);
  const [bookingStatus, setBookingStatus] = useState("waiting");
  const [currentPage, setCurrentPage] = useState(1);
  const [clickPopUp, setClickPopUp] = useState(false);
  const [chosenPayment, setChosenPayment] = useState(null);
  const denyMutation = DenyBookingMutation();
  const acceptMutation = AcceptBookingMutation();

  const propertyBookingQuery = PropertyBookingQuery(
    serachParam.get("property_id"),
    bookingStatus,
    formatDate(new Date(value[0])),
    formatDate(new Date(value[1])),
    currentPage
  );

  const totalItem = Number(propertyBookingQuery.data?.total || 0);
  const totalPage = Math.ceil(totalItem / 10);

  useEffect(() => {
    if (propertyQuery.isSuccess) {
      setValue([propertyQuery.data.start_date, propertyQuery.data.end_date]);
    }
  }, [propertyQuery.status]);

  const paginate = () => {
    const paginate = [];

    if (currentPage - 2 > 0) {
      paginate.push(currentPage - 2);
    }

    if (currentPage - 1 > 0) {
      paginate.push(currentPage - 1);
    }

    paginate.push(currentPage);

    if (currentPage + 1 <= totalPage) {
      paginate.push(currentPage + 1);
    }

    if (currentPage + 2 <= totalPage) {
      paginate.push(currentPage + 2);
    }

    return paginate;
  };

  const onDateChange = (date) => {
    setInputCheck(false);
    setValue(date);
  };

  const onSetActive = (index) => {
    const newActive = [false, false, false, false];
    newActive[index] = true;

    if (index == 0) {
      setBookingStatus("waiting");
    }

    if (index == 1) {
      setBookingStatus("accepted");
    }

    if (index == 2) {
      setBookingStatus("success");
    }

    if (index == 3) {
      setBookingStatus("denied");
    }

    if (JSON.stringify(newActive) == JSON.stringify(active)) {
      return;
    } else {
      setActive(newActive);
    }
  };

  const onClickPrevious = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNext = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onClickFirst = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(1);
    }
  };

  const onClickLast = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(totalPage);
    }
  };

  if (propertyQuery.isLoading) {
    return <Loading />;
  }

  if (propertyQuery.isError) {
    return <p>not found</p>;
  }

  const onChangeToDefault = () => {
    if (value[0] && !value[1]) {
      return;
    }
    setInputCheck(!inputCheck);
    if (inputCheck == false) {
      setValue([propertyQuery.data.start_date, propertyQuery.data.end_date]);
    }
  };

  const onClickPayment = (index) => {
    setClickPopUp(true);
    setChosenPayment(index);
  };

  const onDeny = (ev, id) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    if (!window.confirm("Are you sure you want to deny this booking?")) {
      return;
    }
    const formData = new FormData();
    formData.append("booking_id", id);

    denyMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "property-booking",
            serachParam.get("property_id"),
            bookingStatus,
            formatDate(new Date(value[0])),
            formatDate(new Date(value[1])),
            currentPage,
          ],
        });

        alert("success");
      },
    });
  };

  const onClickBooking = (checkIn, checkOut) => {
    onDateChange([checkIn, checkOut]);
  };

  const onAccept = (ev, id) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    if (!window.confirm("Are you sure you want to accept this booking?")) {
      return;
    }
    const formData = new FormData();
    formData.append("booking_id", id);

    acceptMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "property-booking",
            serachParam.get("property_id"),
            bookingStatus,
            formatDate(new Date(value[0])),
            formatDate(new Date(value[1])),
            currentPage,
          ],
        });

        alert("success");
      },
    });
  };

  return (
    <StyledContainer>
      <StyledLeftContainer>
        <StyledLeftHeader>
          <p>Default</p>
          <div className="toggle-switch">
            <input onChange={onChangeToDefault} checked={inputCheck} className="toggle-input" id="toggle" type="checkbox" />
            <label className="toggle-label" htmlFor="toggle"></label>
          </div>
        </StyledLeftHeader>
        <StyledCalender
          allowPartialRange={true}
          selectRange={true}
          onChange={onDateChange}
          value={value}
          maxDetail={"month"}
          view={"month"}
        />
      </StyledLeftContainer>
      <StyledContent>
        <StyledHeader>
          <StyledButton $styled={active[0]} onClick={() => onSetActive(0)}>
            Request
          </StyledButton>
          <StyledButton $styled={active[1]} onClick={() => onSetActive(1)}>
            Pending payment
          </StyledButton>
          <StyledButton $styled={active[2]} onClick={() => onSetActive(2)}>
            Completed
          </StyledButton>
          <StyledButton $styled={active[3]} onClick={() => onSetActive(3)}>
            Deny
          </StyledButton>
        </StyledHeader>
        <StyledContentBody>
          {propertyBookingQuery.isLoading && <Loading />}
          {propertyBookingQuery.isSuccess &&
            propertyBookingQuery.data.data.map((booking, index) => {
              return (
                <StyledBooking onClick={() => onClickBooking(booking.check_in_date, booking.check_out_date)} key={index}>
                  <div>
                    <Avatar src={booking.user.image} size="100px" textSizeRatio={3} round={true} name={booking.user.first_name} />
                  </div>
                  <div className="second">
                    <h3>
                      {booking.user.first_name} {booking.user.last_name} - {booking.id}
                    </h3>
                    <p>
                      <FontAwesomeIcon className="icon" icon={faPhone} /> {booking.user.phonenumber}
                    </p>
                    <p>
                      <FontAwesomeIcon className="icon" icon={faEnvelope} /> {booking.user.email}{" "}
                    </p>
                    <p>
                      <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                      {booking.check_in_date} <span className="to">to</span> {booking.check_out_date}
                    </p>
                  </div>

                  <StyledButtonList>
                    <button disabled={active[0] != true} onClick={(ev) => onAccept(ev, booking.id)}>
                      Accept
                    </button>
                    <button disabled={active[0] != true} onClick={(ev) => onDeny(ev, booking.id)}>
                      Deny
                    </button>
                    <button onClick={() => onClickPayment(index)}>Payment Detail</button>
                    <button>Send Message</button>
                  </StyledButtonList>
                </StyledBooking>
              );
            })}
          {clickPopUp && (
            <StyledPopUp setShowPopUp={() => setClickPopUp(false)}>
              {propertyBookingQuery.isSuccess && (
                <div>
                  <p>Property Id {propertyBookingQuery.data.data[chosenPayment].property_id}</p>
                  <p>Check in {propertyBookingQuery.data.data[chosenPayment].check_in_date}</p>
                  <p>Check out {propertyBookingQuery.data.data[chosenPayment].check_out_date}</p>
                  <p>Price per day {propertyBookingQuery.data.data[chosenPayment].price_per_day}</p>
                  <p>Price for stay {propertyBookingQuery.data.data[chosenPayment].price_for_stay}</p>
                  <p>Site Fees {propertyBookingQuery.data.data[chosenPayment].price_for_stay}</p>
                </div>
              )}
            </StyledPopUp>
          )}
        </StyledContentBody>
        <StyledPagination>
          <span>{totalItem} Total</span>
          <button onClick={onClickFirst} disabled={currentPage == 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button onClick={onClickPrevious} disabled={currentPage == 1}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {paginate().map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
                className={page == currentPage ? "active" : "unactive"}
              >
                {page}
              </button>
            );
          })}
          <button onClick={onClickNext} disabled={currentPage == totalPage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button onClick={onClickLast} disabled={currentPage == totalPage}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </StyledPagination>
      </StyledContent>
    </StyledContainer>
  );
}
