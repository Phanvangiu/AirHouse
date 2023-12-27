import React from "react";
import styled, { css } from "styled-components";
import Img from "assets/images/hosting-img/booking.jpg";
import { useOutletContext } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 55rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const StyledSecion1 = styled.section`
  min-height: 11rem;
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
const StyledSecion2 = styled.section``;
const StyledForm = styled.form`
  border-radius: 5px;
  padding: 30px 40px 20px 40px;
  overflow: auto;
  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2rem 5px;
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
    font-size: 22px;
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

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledButtonBack = styled.button`
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

const StyledButtonNext = styled.button`
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
const StyledButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const StyledTitle = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 25px;
  background-color: #eeeeee;
  padding: 10px 20px;

  @media (max-width: 992px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;
const StyledBoderInput = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 40px;
  @media (max-width: 992px) {
    border: 1px solid #eeeeee;
  }
`;
const StyledSpan = styled.span`
  color: red;
`;
const StyledText = styled.p`
  font-size: 15px;
  font-weight: 500;

  & .span {
    font-size: 14px;
    font-weight: 400;
  }

  @media (max-width: 992px) {
    /* font-size: 16px; */
    margin-bottom: 15px;
  }
`;
const StyledBooking = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;
const StyledSelect = styled.select`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #717171;

  cursor: pointer;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
    height: 35spx;
  }
`;
const StyledBoderCancellationPolicyInput = styled.select`
  height: 35px;
  border-radius: 5px;
  border: 1px solid #717171;
  cursor: pointer;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    height: 35px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
`;

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Booking = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  const onClickNext = (ev) => {
    ev.preventDefault();

    onSetActive(8);
    onSetAvailable(8);
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    onSetActive(6);
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledOverlay />
        <StyleText>
          <h2>Book your space</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledBoderInput>
            <StyledTitle>Booking</StyledTitle>
            <StyledContent>
              <StyledText>
                <span className="span">Choose how your guests book</span> <StyledSpan>*</StyledSpan>
              </StyledText>
              <StyledText>
                <span className="span">Get ready for guests by choosing your booking style.</span>
              </StyledText>
              <StyledBooking>
                <StyledSelectContainer>
                  <StyledText>Booking Type</StyledText>
                  <StyledSelect
                    value={state.bookingType}
                    onChange={(ev) => {
                      dispatch({ type: ACTIONS.CHANGE_BOOKING_TYPE, next: ev.target.value });
                    }}
                  >
                    <option value={"review"}>Review each request</option>
                    <option value={"instantly"}>Guests book instantly</option>
                  </StyledSelect>
                </StyledSelectContainer>
              </StyledBooking>
            </StyledContent>
          </StyledBoderInput>
          <StyledBoderInput>
            <StyledTitle>Terms</StyledTitle>
            <StyledContent>
              <StyledText>
                <span className="span">The requirements and conditions to book a reservation at your listing.</span>{" "}
                <StyledSpan>*</StyledSpan>
              </StyledText>
              <StyledBooking>
                <StyledSelectContainer>
                  <StyledText>Check in after</StyledText>
                  <StyledSelect
                    value={state.checkInAfter}
                    onChange={(ev) => {
                      dispatch({ type: ACTIONS.CHANGE_CHECKIN, next: ev.target.value });
                    }}
                  >
                    <option value={"02PM"}>02:00 PM</option>
                    <option value={"03PM"}>03:00 PM</option>
                    <option value={"04PM"}>04:00 PM</option>
                    <option value={"05PM"}>05:00 PM</option>
                    <option value={"06PM"}>06:00 PM</option>
                    <option value={"07PM"}>07:00 PM</option>
                    <option value={"08PM"}>08:00 PM</option>
                    <option value={"09PM"}>09:00 PM</option>
                    <option value={"10PM"}>10:00 PM</option>
                    <option value={"11PM"}>11:00 PM</option>
                    <option value={"12PM"}>11:00 PM</option>
                  </StyledSelect>
                </StyledSelectContainer>
                <StyledSelectContainer>
                  <StyledText>Check out before</StyledText>
                  <StyledSelect
                    value={state.checkOutBefore}
                    onChange={(ev) => {
                      dispatch({ type: ACTIONS.CHANGE_CHECKOUT, next: ev.target.value });
                    }}
                  >
                    <option value={"01AM"}>01:00 AM</option>
                    <option value={"02AM"}>02:00 AM</option>
                    <option value={"03AM"}>03:00 AM</option>
                    <option value={"04AM"}>04:00 AM</option>
                    <option value={"05AM"}>05:00 AM</option>
                    <option value={"06AM"}>06:00 AM</option>
                    <option value={"07AM"}>07:00 AM</option>
                    <option value={"08AM"}>08:00 AM</option>
                    <option value={"09AM"}>09:00 AM</option>
                    <option value={"10AM"}>10:00 AM</option>
                    <option value={"11AM"}>11:00 AM</option>
                    <option value={"12AM"}>12:00 AM</option>
                  </StyledSelect>
                </StyledSelectContainer>
              </StyledBooking>
            </StyledContent>
          </StyledBoderInput>

          <StyledButton>
            <StyledButtonBack onClick={onClickPrevious}>Back</StyledButtonBack>
            <StyledButtonNext onClick={onClickNext}>Next</StyledButtonNext>
          </StyledButton>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Booking;
