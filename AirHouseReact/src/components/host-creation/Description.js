import React from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/description.jpg";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 55rem;
  color: #717171;

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
  margin-top: 15px;
  padding: 30px 40px 0 40px;
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

const StyledLable = styled.label`
  font-size: 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #717171;
  padding: 0 20px;
  margin: 10px 0 35px 0;
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

const StyledSpan = styled.span`
  color: red;
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
  margin: 10px 0;
  width: 100%;
  height: 200px;
  border-radius: 5px;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    height: 100px;
    margin: 28px 0;
  }
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
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
  border: none;
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

const Description = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  const onClickNext = (ev) => {
    ev.preventDefault();

    if (state.propertyName == "") {
      alert("Please fill listing name");
      return;
    }

    if (state.description == "") {
      alert("Please fill summary");
      return;
    }

    onSetActive(2);
    onSetAvailable(2);
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();
    onSetActive(0);
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>Add description of your space</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledTitle>Desription</StyledTitle>
          <StyledLable htmlFor="">
            Listing Name <StyledSpan>*</StyledSpan>
          </StyledLable>
          <StyledInput
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_PROPERTY, next: ev.target.value });
            }}
            value={state.propertyName}
            type="text"
            placeholder="Entire home/apt in "
          />
          <StyledLable htmlFor="">
            Summary <StyledSpan>*</StyledSpan>
          </StyledLable>
          <StyledTextarea
            onChange={(ev) => {
              dispatch({ type: ACTIONS.CHANGE_DESCRIPTION, next: ev.target.value });
            }}
            value={state.description}
          ></StyledTextarea>
          <StyledGroupButon>
            <StyledLink onClick={onClickPrevious}>Back </StyledLink>
            <StyledLink onClick={onClickNext}>Next</StyledLink>
          </StyledGroupButon>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Description;
