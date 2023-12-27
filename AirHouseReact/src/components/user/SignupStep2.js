import React, { useState } from "react";
import styled from "styled-components";
import { CreateUserMutation } from "api/userApi";

const StyledContainer = styled.div`
  border: 1px solid red;
  padding: 25px;
  border-radius: 3px;
  background-color: white;
  max-height: 550px;
  overflow-y: scroll;
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
  display: flex;
  flex-direction: column;
`;
const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
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

const StyledSpan = styled.p`
  font-size: 14px;
  color: #717171;
  padding: 10px 0 0px 0;
`;

const PASSWORD_REGEX = /^.{9,}$/;

const SignupStep2 = ({ state, dispatch, setShowSignUp }) => {
  const createMutation = CreateUserMutation();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dobError, setDOBError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();
    let isError = false;

    if (state.first_name.trim().length == 0) {
      setFirstNameError(true);
      isError = true;
    } else {
      setFirstNameError(false);
    }

    if (state.last_name.trim().length == 0) {
      setLastNameError(true);
      isError = true;
    } else {
      setLastNameError(false);
    }

    if (!state.date_of_birth) {
      setDOBError(true);
      isError = true;
    } else {
      setDOBError(false);
    }

    if (!PASSWORD_REGEX.test(state.password)) {
      setPasswordError(true);
      isError = true;
    } else {
      setPasswordError(false);
    }

    if (state.password.trim() != state.password_confirm.trim()) {
      setPasswordConfirmError(true);
      isError = true;
    } else {
      setPasswordConfirmError(false);
    }

    if (isError == true) {
      return;
    }

    if (isError == false) {
      createMutation.mutate(
        {
          email: state.email,
          password: state.password,
          birthday: state.date_of_birth,
          first_name: state.first_name,
          last_name: state.last_name,
        },
        {
          onSuccess: () => {
            setShowSignUp(false);
          },
        }
      );
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Finish signing up</StyledTitle>
      <StyledForm>
        <StyledFormContainer>
          <StyledInput
            type="text"
            placeholder="First name"
            value={state.first_name}
            onChange={(e) => dispatch({ type: "handle-first-name", next: e.target.value })}
          />
          <StyledError>{firstNameError && <span>First name is required</span>}</StyledError>
          <StyledInput
            type="text"
            placeholder="Last name"
            value={state.last_name}
            onChange={(e) => dispatch({ type: "handle-last-name", next: e.target.value })}
          />
          <StyledSpan>Make sure it matches the name on your goverment ID.</StyledSpan>
          <StyledError>{lastNameError && <span>Last name is required</span>}</StyledError>
          <StyledInput
            type="date"
            id="birthday"
            name="birthday"
            value={state.date_of_birth}
            onChange={(e) => dispatch({ type: "handle-date-of-birth", next: e.target.value })}
          />
          <StyledSpan>To signup, you need to be at least 18. Your birthday won't be share with other people who use AirHouse.</StyledSpan>
          <StyledError>{dobError && <span>Date of birth is required</span>}</StyledError>
          <StyledInput
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => dispatch({ type: "handle-password", next: e.target.value })}
          />
          <StyledSpan>Password must have at least 9 characters</StyledSpan>
          <StyledError>{passwordError && <span>Please enter valid password</span>}</StyledError>
          <StyledInput
            type="password"
            placeholder="Password Confirm"
            value={state.password_confirm}
            onChange={(e) => dispatch({ type: "handle-password-confirm", next: e.target.value })}
          />
          <StyledError>{passwordConfirmError && <span>Wrong password confirmation</span>}</StyledError>
        </StyledFormContainer>
        <StyledButtonSubmit type="submit" onClick={validateForm}>
          Finish
        </StyledButtonSubmit>
      </StyledForm>
    </StyledContainer>
  );
};

export default SignupStep2;
