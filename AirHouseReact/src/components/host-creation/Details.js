import React from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/room_bed.jpg";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 3fr;
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
const StyledSecion2 = styled.section``;

const StyledForm = styled.form`
  border-radius: 5px;
  padding: 30px 40px 20px 40px;

  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 30px 40px 0px 40px;
  }
`;
const StyleText = styled.div`
  line-height: 40px;
  color: white;
  z-index: 99;

  h2 {
    font-size: 27px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 25px;
      margin-bottom: 10px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const StyledLable = styled.label`
  font-size: 16px;
  color: #717171;
`;

const StyledTitle = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
`;
const StyledTextarea = styled.textarea`
  resize: none;
  padding: 10px 20px;
  margin: 15px 0;
  width: 100%;
  height: 100px;
  border-radius: 5px;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    height: 100px;
    margin: 15px 0;
  }
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled.button`
  background-color: red;
  cursor: pointer;
  border: none;
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  transition: all 0.1s;
  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;

const Details = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    onSetActive(1);

  };

  const onClickNext = (ev) => {
    ev.preventDefault();

    onSetActive(3);
    onSetAvailable(3);
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>You can add more details Tell travelers about your space and hosting style.</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledTitle>Details</StyledTitle>
          <StyledLable htmlFor="">About Place</StyledLable>
          <StyledTextarea
            value={state.aboutPlace}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_ABOUT_PLACE, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Place is great for</StyledLable>
          <StyledTextarea
            value={state.placeGreatFor}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_PLACE_GREAT_FOR, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Guest Access</StyledLable>
          <StyledTextarea
            value={state.guestAccess}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_GUEST_ACCESS, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Interaction with Guests</StyledLable>
          <StyledTextarea
            value={state.interactionGuest}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_INTERACTION_GUEST, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Other Things to Note</StyledLable>
          <StyledTextarea
            value={state.thingToNote}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_THING_TO_NOTE, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Overview</StyledLable>
          <StyledTextarea
            value={state.overview}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_OVERVIEW, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledLable htmlFor="">Getting Around</StyledLable>
          <StyledTextarea
            value={state.gettingAround}
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_GETTING_AROUND, next: ev.target.value });
            }}
          ></StyledTextarea>
          <StyledGroupButon>
            <StyledLink onClick={onClickPrevious}>Back </StyledLink>
            <StyledLink onClick={onClickNext}>Next </StyledLink>
          </StyledGroupButon>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Details;
