import styled from "styled-components";
import StyledBoxContainer from "../../../ui/StyledBoxContainer";
import Signup from "../../user/Signup";
import Overlay from "../../../ui/Overlay";
import { useState, useEffect, useRef } from "react";
import Login from "../../user/Login";
import { LogoutUserMutation, UserQuery } from "api/userApi";
import SignupStep1 from "components/user/SignupStep1";
import SignUpContainer from "components/user/SignUpContainer";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";

const StyledDropDownContainer = styled(StyledBoxContainer)`
  width: 15rem;
  padding: 10px 0;
  position: absolute;
  transform: translate(-105%, 30px);
  background-color: white;
  display: flex;
  flex-direction: column;

  & button {
    text-align: left;
    padding: 0.7rem 1rem;
    background-color: white;
    border: none;
    cursor: pointer;
  }

  & .first {
    border-top-left-radius: 50;
    border-top-right-radius: 50;
  }

  & button:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
`;

const StyledOverlay = styled(Overlay)`
  z-index: 2;
`;

const StyledContainer = styled.div``;

function UserDropDown({ blur, showDropDown }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const userQuery = UserQuery();

  function onShowSignUpHandler() {
    setShowSignUp(true);
    blur();
  }

  function onShowLoginHandler() {
    setShowLogin(true);
    blur();
  }

  const onDashboardHandler = () => {
    navigate("/user/your-dashboard");
    blur();
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        const dropDownButton = document.querySelector(".navbar-dropdown");
        if (ref.current && !ref.current.contains(event.target) && !dropDownButton.contains(event.target)) {
          blur();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      if (showSignUp === true || showLogin === true) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, showSignUp, showLogin]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const logoutMutation = LogoutUserMutation();

  const onLogoutHandler = () => {
    logoutMutation.mutate();
    blur();
  };

  const onListingHandler = () => {
    navigate("/user/listing");
    blur();
  };

  const onTripHandler = () => {
    navigate("/user/booking-list");
    blur();
  };

  return (
    <StyledContainer>
      {showDropDown && (
        <StyledDropDownContainer ref={wrapperRef}>
          {userQuery.isSuccess || <button onClick={onShowSignUpHandler}>Signup</button>}
          {userQuery.isSuccess && <button onClick={onDashboardHandler}>Dashboard</button>}
          {userQuery.isSuccess || <button onClick={onShowLoginHandler}>Log in</button>}
          {userQuery.isSuccess && <button onClick={onLogoutHandler}>Log out</button>}
          {userQuery.isSuccess && <button onClick={onListingHandler}>Listing</button>}
          {userQuery.isSuccess && <button onClick={onTripHandler}>My Trips</button>}
          <button>AirHouse your home</button>
          <button onClick={() => alert("ngo dinh tan")}>Help Center</button>
        </StyledDropDownContainer>
      )}
      {showSignUp && <SignUpContainer setShowSignUp={setShowSignUp} />}
      {showLogin ? (
        <div>
          <StyledOverlay onClick={() => setShowLogin(false)} />
          <Login setShowLogin={setShowLogin} />
        </div>
      ) : (
        <></>
      )}
    </StyledContainer>
  );
}

export default UserDropDown;
