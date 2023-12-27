import React, { createRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/room_bed.jpg";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  min-height: 55rem;

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
  overflow: auto;
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

const StyledLable = styled.label`
  font-size: 16px;
  color: #717171;
  @media (max-width: 992px) {
    color: black;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #717171;
  padding: 0 20px;
  margin: 10px 0px 35px 0px;
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

const StyledTitle = styled.div`
  color: black;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 25px;
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled.button`
  background-color: red;
  border: 0;
  cursor: pointer;
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

const Basic = () => {
  // Tạo một mảng số từ 1 đến 10
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const accomodatesNumbers = Array.from({ length: 16 }, (_, index) => index + 1);
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.CHANGE_BATH_ROOM_COUNT, next: state.bedroomCount });
    dispatch({ type: ACTIONS.CHANGE_BEDROOM_COUNT, next: state.bathRoomCount });
    dispatch({ type: ACTIONS.CHANGE_ACCOMODATES_COUNT, next: state.accomodatesCount });
  }, []);

  const navigate = useNavigate();
  const onClickNext = (ev) => {
    ev.preventDefault();
    onSetActive(1);
    onSetAvailable(1);
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();
    if (state.property_id) {
      navigate({
        pathname: "/user/host-update/become-host",
        search: `id=${state.property_id}`,
      });
    } else {
      navigate("/user/host-creation/become-host");
    }
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>List your space</h2>
          <p>Buy? Rantal Let's your make money renting out your place</p>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledTitle htmlFor="">Rooms and Beds </StyledTitle>
          <StyledLable htmlFor="">Bedrooms</StyledLable>
          <StyledSelect
            value={state.bedroomCount}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_BEDROOM_COUNT, next: ev.target.value });
            }}
          >
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </StyledSelect>

          <StyledLable htmlFor="">Bathrooms</StyledLable>
          <StyledSelect
            value={state.bathRoomCount}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_BATH_ROOM_COUNT, next: ev.target.value });
            }}
          >
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </StyledSelect>
          <StyledLable htmlFor="">Accommodates </StyledLable>
          <StyledSelect
            value={state.accomodatesCount}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_ACCOMODATES_COUNT, next: ev.target.value });
            }}
          >
            {accomodatesNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </StyledSelect>
          <StyledGroupButon>
            <StyledLink onClick={onClickPrevious}>Previous </StyledLink>
            <StyledLink onClick={onClickNext}>Continute</StyledLink>
          </StyledGroupButon>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Basic;
