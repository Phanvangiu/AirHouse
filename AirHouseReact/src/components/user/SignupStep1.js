import React, { useState } from "react";
import styled from "styled-components";
import { CheckEmailMutation } from "api/userApi";

const StyledContainer = styled.div`
  border: 1px solid red;
  padding: 25px;
  border-radius: 3px;
  background-color: white;
`;
const StyledTitle = styled.h2`
  color: red;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  font-weight: 400;
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
  margin: 0 -25px;
`;
const StyledForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;
const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  height: 50px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 0 10px;
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    border: 1px solid rgba(255, 0, 0, 0.3);
    outline: 1px solid rgba(255, 0, 0, 0.3);
  }
`;
const StyledButtonSubmit = styled.button`
  padding: 10px 25px;
  font-size: 18px;
  font-weight: 400;
  color: white;
  background-color: #db0c63;
  border: none;
  cursor: pointer;
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;
const StyledWith = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;
  font-weight: 400;
  margin-top: 1.3rem;

  &::after {
    content: "";
    display: inline-block;
    width: 50px;
    border-bottom: 2px solid #dddddd;
    margin: 5px;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 50px;
    border-bottom: 2px solid #dddddd;
    margin: 5px;
  }
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
`;

const StyledWelcome = styled.div`
  color: red;
  padding: 0 25px;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 20px;

  margin: 0 -25px;
`;

const SignupStep1 = ({ state, dispatch }) => {
  const [errorText, setErrorText] = useState(false);
  const [notUnique, setNotUnique] = useState(false);
  const checkMutation = CheckEmailMutation();

  const validateForm = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.email)) {
      setErrorText(true);
      return;
    } else {
      setErrorText(false);
    }

    checkMutation.mutate(state.email, {
      onError: () => {
        setNotUnique(true);
      },
      onSuccess: () => {
        setNotUnique(false);
        dispatch({ type: "handle-current", next: 2 });
      },
    });
  };

  return (
    <StyledContainer>
      <StyledTitle>Log in or sign up</StyledTitle>
      <StyledForm>
        <StyledWelcome>Welcome to AirHouse</StyledWelcome>
        <StyledFormContainer>
          <StyledInput
            type="text"
            placeholder="Email"
            value={state.email}
            onChange={(ev) => dispatch({ type: "handle-email", next: ev.target.value.trim() })}
          />
          <StyledError>
            {errorText && <span>Please enter a valid email</span>}
            {notUnique && <span>Someone is already using this email</span>}
          </StyledError>
        </StyledFormContainer>
        <StyledButtonSubmit onClick={validateForm}>Continute</StyledButtonSubmit>\
      </StyledForm>
    </StyledContainer>
  );
};

export default SignupStep1;
