import React from "react";
import { useState } from "react";
import styled from "styled-components";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import PopUpContainer from "ui/PopUpContainer";
import { useReducer } from "react";

const StyledPopUpContainer = styled(PopUpContainer)`
  position: fixed;
  top: 15%;
  min-width: 500px;
`;

function reducer(state, action) {
  switch (action.type) {
    case "handle-email":
      return { ...state, email: action.next };

    case "handle-password":
      return { ...state, password: action.next };

    case "handle-password-confirm":
      return { ...state, password_confirm: action.next };

    case "handle-first-name":
      return { ...state, first_name: action.next };

    case "handle-last-name":
      return { ...state, last_name: action.next };

    case "handle-date-of-birth":
      return { ...state, date_of_birth: action.next };

    case "handle-current":
      return { ...state, current: action.next };
  }
}

export default function SignUpContainer({ setShowSignUp }) {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    current: 1,
  });

  return (
    <StyledPopUpContainer setShowPopUp={setShowSignUp}>
      {state.current === 1 ? (
        <SignupStep1 state={state} dispatch={dispatch} />
      ) : (
        <SignupStep2 setShowSignUp={setShowSignUp} state={state} dispatch={dispatch} />
      )}
    </StyledPopUpContainer>
  );
}
