import React, { createRef } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import Img from "assets/images/hosting-img/calender.jpg";
import { Link } from "react-router-dom";
import { Calendar as CalendarLb } from "react-calendar";
import "./calendar.css";
import { useOutletContext } from "react-router-dom";
import { CreatePropertyMutation } from "api/hostApi";
import { UpdatePropertyMutation } from "api/propertyApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CreateExceptionDateMutation } from "api/exceptionDateApi";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 50rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSecion1 = styled.section`
  min-height: 10rem;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1rem;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const StyledSecion2 = styled.section`
  /* width: 60%; */
`;

const StyledForm = styled.form`
  border-radius: 5px;
  margin-top: 15px;
  padding: 30px 40px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const StyleText = styled.div`
  line-height: 30px;
  color: white;
  z-index: 99;

  h2 {
    font-size: 30px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 30px;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const StyledLink = styled.button`
  border: none;
  cursor: pointer;
  background-color: red;
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  transition: all 0.1s;
  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const StyledCalendar = styled(CalendarLb)`
  background-color: white;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
  }
`;

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #717171;
  padding: 0 20px;
  border-radius: 5px;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #717171;
  padding: 0 20px;
  cursor: pointer;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
    height: 35px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 40px 0;
`;

const StyledHeaderButton = styled.button`
  transition: all 0.1s ease-in-out;
  background-color: white;
  border: none;
  font-size: 17px;
  border-bottom: 3px solid white;
  padding-bottom: 2px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  ${(props) => {
    if (props.$style == true) {
      return css`
        border-bottom: 3px solid red;
      `;
    }
  }}
`;

const StyledSubmitButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:active {
    font-weight: 600;
    background-color: white;
  }
`;

const StyledExceptionList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  & .to {
    font-weight: 600;
    font-size: 14px;
    border-bottom: none;
    margin: 0 5px;
  }

  & span {
    border-bottom: 1px solid black;
  }

  & button {
    cursor: pointer;
  }
`;

const StyledExceptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid black;
  max-height: 10rem;
  overflow-y: scroll;
`;

const formatDate = (dateObj) => {
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
};

const listDate = (start, end) => {
  const allDatesInRange = [];

  const current = new Date(start);
  const endDate = new Date(end);

  while (formatDate(current) <= formatDate(endDate)) {
    allDatesInRange.push(formatDate(current));

    current.setDate(current.getDate() + 1);
  }

  return allDatesInRange;
};

const Calendar = () => {
  const navigate = useNavigate();
  const propertyMutation = CreatePropertyMutation();
  const updateMutation = UpdatePropertyMutation();
  const [active, setActive] = useState([true, false]);
  const [value, setValue] = useState(new Date());
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();
  const [exceptionValue, setExceptionValue] = useState();
  const [exceptionValueArray, setExceptionValueArray] = useState(state.exceptionDate);

  const [calendar, setCalendar] = useState();

  const changeActive = (index) => {
    const newArr = [false, false];
    newArr[index] = true;
    setActive(newArr);
  };

  function formatDateToString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const onClickFinish = (ev) => {
    ev.preventDefault();

    if (state.minimumStay <= 0 || state.maximumStay <= 0) {
      alert("min stay and max stay must large than 0");
      return;
    }

    if (state.minimumStay > state.maximumStay) {
      alert("min stay cannot be larget than max stay");
      return;
    }

    const formData = new FormData();
    formData.append("name", state.propertyName);
    state.amenities.forEach((amenity) => formData.append("amenities[]", amenity));
    formData.append("description", state.description);
    formData.append("about_place", state.aboutPlace); //
    formData.append("place_great_for", state.placeGreatFor); //
    formData.append("guest_access", state.guestAccess); //
    formData.append("interaction_guest", state.interactionGuest); //
    formData.append("thing_to_note", state.thingToNote); //
    formData.append("overview", state.overview); //
    formData.append("getting_around", state.gettingAround); //
    formData.append("property_type_id", state.propertyTypeId);
    formData.append("room_type_id", state.roomTypeId);
    formData.append("category_id", state.categoryId);
    formData.append("provinces_id", state.provinces_id < 10 ? "0" + Number(state.provinces_id) : state.provinces_id);
    formData.append("districts_id", state.district_id);
    formData.append("address", state.address);
    formData.append("bedroom_count", state.bedroomCount);
    formData.append("bathroom_count", state.bathRoomCount);
    formData.append("accomodates_count", state.accomodatesCount);
    formData.append("start_date", formatDateToString(new Date(state.startDate)));
    formData.append("end_date", formatDateToString(new Date(state.endDate)));
    formData.append("base_price", state.baseprice); //
    formData.append("booking_type", state.bookingType); //
    formData.append("check_in_after", state.checkInAfter); //
    formData.append("check_out_before", state.checkOutBefore); //
    formData.append("minimum_stay", state.minimumStay);
    formData.append("maximum_stay", state.maximumStay);

    formData.append("property_status", state.property_status == "true" ? 1 : 0); //
    state.exceptionDate.forEach((exception) => {
      formData.append("exception[]", JSON.stringify(exception));
    });
    Array.from(state.images).forEach((image) => formData.append("images[]", image));
    formData.append("video", state.video); //

    if (state.property_id) {
      formData.append("id", state.property_id);
      updateMutation.mutate(formData, {
        onSuccess: () => {
          alert("success update");
        },
      });
    } else {
      propertyMutation.mutate(formData, {
        onSuccess: (data) => {
          alert("success");
          navigate("/user/listing");
        },
      });
    }
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    if (state.minimumStay <= 0 || state.maximumStay <= 0) {
      alert("min stay and max stay must large than 0");
      return;
    }

    if (state.minimumStay > state.maximumStay) {
      alert("min stay cannot be larget than max stay");
      return;
    }

    onSetActive(7);
  };

  const onAddExceptionDate = (ev) => {
    ev.preventDefault();
    setExceptionValueArray([
      ...exceptionValueArray,
      { start: formatDate(new Date(exceptionValue[0])), end: formatDate(new Date(exceptionValue[1])) },
    ]);

    dispatch({
      type: ACTIONS.CHANGE_EXCEPTION_DATE,
      next: [...exceptionValueArray, { start: formatDate(new Date(exceptionValue[0])), end: formatDate(new Date(exceptionValue[1])) }],
    });
  };

  const onExceptionDate = ({ date }) => {
    let arrExceptionDate = [];
    for (let i = 0; i < exceptionValueArray.length; i++) {
      arrExceptionDate = [...arrExceptionDate, ...listDate(exceptionValueArray[i].start, exceptionValueArray[i].end)];
    }

    const isDisabled = arrExceptionDate.some((bookedDate) => {
      return bookedDate == formatDate(new Date(date));
    });

    return isDisabled;
  };

  const onDeleteException = (ev, dateIndex) => {
    ev.preventDefault();
    setExceptionValueArray(exceptionValueArray.filter((exception, index) => index != dateIndex));
    dispatch({ type: ACTIONS.CHANGE_EXCEPTION_DATE, next: exceptionValueArray.filter((exception, index) => index != dateIndex) });
  };

  const onHandleChangeException = (date) => {
    let selectedArr = [];

    if (date[1] == null) {
      selectedArr = [...listDate(formatDate(new Date(date[0])), formatDate(new Date(date[0])))];
    } else {
      selectedArr = [...listDate(formatDate(new Date(date[0])), formatDate(new Date(date[1])))];
    }

    let arrExceptionDate = [];
    for (let i = 0; i < exceptionValueArray.length; i++) {
      arrExceptionDate = [...arrExceptionDate, ...listDate(exceptionValueArray[i].start, exceptionValueArray[i].end)];
    }

    let isWrong = false;

    selectedArr.forEach((selectedDate) => {
      if (arrExceptionDate.includes(selectedDate)) {
        isWrong = true;
        return;
      }
    });

    if (isWrong) {
      setExceptionValue(exceptionValue);
    } else {
      setExceptionValue(date);
    }
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>Add your location</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledHeader>
          <StyledHeaderButton $style={active[0]} onClick={() => changeActive(0)}>
            Calender
          </StyledHeaderButton>
          <StyledHeaderButton disabled={!state.endDate} $style={active[1]} onClick={() => changeActive(1)}>
            Exception Date
          </StyledHeaderButton>
        </StyledHeader>
        {active[0] && (
          <StyledForm>
            <StyledCalendar
              value={[state.startDate, state.endDate]}
              onChange={(value) => {
                dispatch({ type: ACTIONS.CHANGE_START_DATE, next: value[0] });
                dispatch({ type: ACTIONS.CHANGE_END_DATE, next: value[1] });
                setExceptionValueArray([]);
                dispatch({ type: ACTIONS.CHANGE_EXCEPTION_DATE, next: [] });
              }}
              allowPartialRange={true}
              selectRange={true}
              returnValue={"range"}
              view={"month"}
              minDate={new Date()}
              maxDetail={"month"}
            />
            <StyledBox>
              <label>Minimum Stay</label>
              <StyledInput
                value={state.minimumStay}
                onChange={(ev) => {
                  dispatch({ type: ACTIONS.CHANGE_MINIMUM_STAY, next: ev.target.value });
                  if (state.minimumStay >= state.maximumStay) {
                    dispatch({ type: ACTIONS.CHANGE_MAXIMUM_STAY, next: Number(state.minimumStay) + 1 });
                  }
                }}
                type="number"
                min={1}
              />
            </StyledBox>
            <StyledBox>
              <label>Maximum Stay</label>
              <StyledInput
                min={state.minimumStay}
                value={state.maximumStay}
                onChange={(ev) => {
                  dispatch({ type: ACTIONS.CHANGE_MAXIMUM_STAY, next: ev.target.value });
                }}
                type="number"
              />
            </StyledBox>
            <StyledBox>
              <label>Status</label>
              <StyledSelect
                onChange={(ev) => {
                  dispatch({ type: ACTIONS.CHANGE_STATUS, next: ev.target.value });
                }}
                value={state.property_status}
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </StyledSelect>
            </StyledBox>
            <StyledGroupButon>
              <StyledLink onClick={onClickPrevious}>Back </StyledLink>
              <StyledLink onClick={onClickFinish}>Finish </StyledLink>
            </StyledGroupButon>
          </StyledForm>
        )}
        {active[1] && (
          <StyledForm>
            <StyledCalendar
              value={exceptionValue}
              allowPartialRange={true}
              selectRange={true}
              returnValue={"range"}
              view={"month"}
              minDate={new Date(state.startDate)}
              maxDate={new Date(state.endDate)}
              maxDetail={"month"}
              onChange={onHandleChangeException}
              tileDisabled={onExceptionDate}
            />
            <StyledSubmitButton onClick={onAddExceptionDate} disabled={!exceptionValue?.[1]}>
              Submit
            </StyledSubmitButton>
            <StyledExceptionContainer>
              {exceptionValueArray.map((exceptionObj, index) => {
                return (
                  <StyledExceptionList key={index}>
                    <span>
                      {exceptionObj.start} <span className="to">to</span> {exceptionObj.end}
                    </span>
                    <button onClick={(ev) => onDeleteException(ev, index)}>
                      <FontAwesomeIcon icon={faClose} />{" "}
                    </button>
                  </StyledExceptionList>
                );
              })}
            </StyledExceptionContainer>
          </StyledForm>
        )}
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Calendar;
