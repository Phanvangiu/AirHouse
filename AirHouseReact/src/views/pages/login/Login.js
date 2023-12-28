import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import styled from "styled-components";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useRef } from "react";
import { onLogin } from "api/userApi";
import { useNavigate } from "react-router-dom";

import { AdminLoginMutation } from "api/userApi";

import "scss/style.scss";

const StyledError = styled.div`
  color: red;
`;

const Login = () => {
  const loginMutation = AdminLoginMutation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [accountError, setAccountError] = useState(false);
  const [wrongType, setWrongType] = useState(false);

  function clickLogin() {
    setAccountError(false);
    setWrongType(false);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    loginMutation.mutate(payload, {
      onError: (error) => {
        const response = error.response;

        if (response.status == 401) {
          setAccountError(true);
        }
        if (response.status == 403) {
          setWrongType(true);
        }
      },
    });
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        ref={emailRef}
                        placeholder="Email"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {accountError && (
                      <StyledError>Wrong password or account</StyledError>
                    )}
                    {wrongType && (
                      <StyledError>
                        This account can't not access admin
                      </StyledError>
                    )}
                    <CRow>
                      <CCol xs={8}>
                        <CButton
                          onClick={clickLogin}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
