import React from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/photos.jpg";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr;
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledLable = styled.label`
  font-size: 14px;
  padding-left: 10px;
  color: black;
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

const StyledButtonInput = styled.div`
  border: 1px solid #717171;
  height: 35px;
  width: calc(100% - 100px);
  margin: 10px 50px 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 34px;
    background-color: #dddddd;
    border: 1px solid #717171;
  }

  input {
    width: calc(100% - 25px);
    height: 34px;
  }

  & input:focus,
  & input:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    width: calc(100% - 60px);
    margin: 10px 20px;
  }
`;
const StyledBoderInput = styled.div`
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 40px;
  padding-bottom: 1rem;

  & .label-input {
    margin: 0px 0px 0px 40px;
  }

  @media (max-width: 992px) {
    border: 1px solid #eeeeee;
    margin-bottom: 25px;
  }
`;
const StyledInputCheck = styled.input`
  cursor: pointer;
  zoom: 1.5;
`;
const StyleGroupPricing = styled.div`
  display: flex;
  align-items: center;
  margin: 0 30px;
`;
const StyledSpan = styled.span`
  color: red;
`;
const StyledP = styled.p`
  margin: 15px 50px 0 50px;
  font-size: 15px;
  @media (max-width: 992px) {
    margin: 5px 20px 0 20px;
    font-size: 15px;
  }
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Pricing = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  const onClickNext = (ev) => {
    ev.preventDefault();

    if (state.baseprice <= 0) {
      alert("Price must larger than 0");
      return;
    }

    onSetActive(7);
    onSetAvailable(7);
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    if (state.baseprice <= 0) {
      alert("Price must larger than 0");
      return;
    }

    onSetActive(5);
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledOverlay />
        <StyleText>
          <h2>Add your photos & videos</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledBoderInput>
            <StyledTitle>Base price</StyledTitle>
            <StyledLable className="label-input">
              Daily Price <StyledSpan>*</StyledSpan>
            </StyledLable>
            <StyledButtonInput>
              <p>$</p>
              <input
                onChange={(ev) => {
                  dispatch({ type: ACTIONS.CHANGE_BASE_PRICE, next: Number(ev.target.value) });
                }}
                value={state.baseprice}
                type="number"
              />
            </StyledButtonInput>
          </StyledBoderInput>
       

          <StyledGroupButon>
            <StyledLink onClick={onClickPrevious}>Back </StyledLink>
            <StyledLink onClick={onClickNext}>Next </StyledLink>
          </StyledGroupButon>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Pricing;
