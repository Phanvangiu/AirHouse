import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import { LoginUserMutation } from "../../api/userApi";
import { GoogleLogin } from "@react-oauth/google";
import { isExpired, decodeToken } from "react-jwt";
import { SignUpGoogleMutation } from "../../api/userApi";
import { useGoogleLogin } from "@react-oauth/google";

const StyledContainer = styled.div`
  border: 1px solid red;
  width: 500px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 3px;
  z-index: 6;
  position: fixed;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;

  & .google {
    width: 100%;
    height: 50px;
  }
`;
const Styledh2 = styled.h2`
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
  text-align: justify;
`;

const StyledGoogleLogin = styled.button``;

const EMAIL_REGEX = /^[0-9a-zA-Z_]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
const PASSWORD_REGEX = /^.{8,}$/;

const Login = ({ setShowLogin }) => {
  const signUpGoogleMutation = SignUpGoogleMutation();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [wrongAccount, setWrongAccount] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const loginMutation = LoginUserMutation();
  const validateForm = (e) => {
    e.preventDefault();
    let isError = false;
    setWrongAccount(false);

    if (!EMAIL_REGEX.test(emailRef.current.value)) {
      setEmailError(true);
      isError = true;
    }

    if (!PASSWORD_REGEX.test(passwordRef.current.value)) {
      setPasswordError(true);
      isError = true;
    }

    if (isError === true) {
      return;
    } else {
      setEmailError(false);
      setPasswordError(false);
    }

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    loginMutation.mutate(payload, {
      onSuccess: () => {
        setShowLogin(false);
      },
      onError: () => {
        setWrongAccount(true);
      },
    });
  };

  const googleRef = useRef();

  return (
    <StyledContainer>
      <Styledh2>Login</Styledh2>
      <StyledForm>
        <StyledFormContainer>
          <StyledInput ref={emailRef} type="email" />
          <StyledError>{emailError && <span>Please enter a valid email</span>}</StyledError>
          <StyledInput type="password" placeholder="Password" ref={passwordRef} />
          <StyledError>
            {passwordError && <span>Password must have atleast 9 letters</span>}
            {wrongAccount && <span>Wrong account or password</span>}
          </StyledError>
        </StyledFormContainer>
        <StyledButtonSubmit type="submit" onClick={validateForm}>
          Continute
        </StyledButtonSubmit>
        <StyledWith>Login with</StyledWith>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const dataGoogle = decodeToken(credentialResponse?.credential);
            const payload = {
              email: dataGoogle.email,
              first_name: dataGoogle.name,
            };

            signUpGoogleMutation.mutate(payload, {
              onSuccess: () => {
                setShowLogin(false);
              },
              onError: () => {
                setSignInError(true);
              },
            });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <StyledError>
          {signInError && <span>AirHouse don't have any account associate with this email. Please sign-up first</span>}
        </StyledError>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
