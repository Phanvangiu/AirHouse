import React, { useRef } from "react";
import styled from "styled-components";
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useQuery } from "@tanstack/react-query";
import { RegisterAdminMutation } from "api/userApi";
import { useState } from "react";

const PASSWORD_REGEX = /^[a-zA-Z0-9]{9,}$/;

const StyledError = styled.h6`
  color: red;
  font-size: 15px;
`;

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [accountError, setAccountError] = useState(false);

  const registerMutation = RegisterAdminMutation();

  const onRegister = (ev) => {
    let isOk = true;
    setAccountError(false);

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRef.current.value)) {
      setEmailError(true);
      isOk = false;
    } else {
      setEmailError(false);
    }

    if (!PASSWORD_REGEX.test(passwordRef.current.value)) {
      setPasswordError(true);
      isOk = false;
    } else {
      setPasswordError(false);
    }

    if (passwordRef.current.value != passwordConfirmRef.current.value) {
      setPasswordConfirmError(true);

      isOk = false;
    } else {
      setPasswordConfirmError(false);
    }

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (isOk) {
      registerMutation.mutate(payload, {
        onSuccess: () => {
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordConfirmRef.current.value = "";
          alert("success");
        },
        onError: () => {
          setAccountError(true);
        },
      });
    }
  };

  return (
    <div className="bg-light  d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center mt-5">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput ref={emailRef} placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  {emailError && <StyledError>Wrong Email format</StyledError>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput ref={passwordRef} type="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  {passwordError && <StyledError>Password must have at least 9 characters</StyledError>}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput ref={passwordConfirmRef} type="password" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  {passwordConfirmError && <StyledError>Wrong password confirmation</StyledError>}
                  {accountError && <StyledError>Account Exist!</StyledError>}
                  <div onClick={onRegister} className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
