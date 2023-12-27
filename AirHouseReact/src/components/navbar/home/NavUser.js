import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";
import "./avatar.css";
import { Link } from "react-router-dom";
import StyledButtonContainer from "../../../ui/StyledButtonContainer";
import { UserQuery } from "api/userApi";

import UserDropDown from "./UserDropDown";
import userEvent from "@testing-library/user-event";

const StyledUserContainer = styled(StyledButtonContainer)`
  width: fit-content;
  padding: 7px 16px;
  display: flex;
  align-items: center;
  gap: 1rem;

  & .user {
    font-size: 1.8rem;
    color: gray;
  }

  & .bar {
    font-size: 1rem;
  }

  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }

  @media (max-width: 800px) {
    border: none;
    box-shadow: none;
  }
`;

const StyledTextLink = styled(Link)`
  padding: 0.8rem 10px;
  box-shadow: none;
  font-weight: 600;
  color: black;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    box-shadow: none;
    background-color: rgb(247, 247, 247);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function NavUser() {
  const [showDropDown, setShowDropDown] = useState(false);
  const userQuery = UserQuery();
  const [becomeHost, setBecomeHost] = useState(false);

  function onClickDropDown() {
    setShowDropDown(!showDropDown);
  }

  function onBlurDropDown() {
    setShowDropDown(false);
  }

  return (
    <StyledContainer>
      {userQuery.isError || userQuery.isLoading ? (
        <StyledTextLink to="/aircover-for-hosts">Airbnb your home</StyledTextLink>
      ) : (
        <StyledTextLink to="/user/host-creation/become-host">Become a Host</StyledTextLink>
      )}
      <StyledUserContainer className="navbar-dropdown" onClick={onClickDropDown}>
        <FontAwesomeIcon className="bar" icon={faBars} />
        {userQuery.isLoading || userQuery.isError ? (
          <FontAwesomeIcon className="user" icon={faCircleUser} />
        ) : (
          userQuery.isSuccess && (
            <Avatar src={userQuery.data.user.image} size="30px" textSizeRatio={2} round={true} name={userQuery.data.user.first_name} />
          )
        )}
      </StyledUserContainer>
      <UserDropDown showDropDown={showDropDown} blur={onBlurDropDown} className="dropdown" />
    </StyledContainer>
  );
}

export default NavUser;

export const ReponsiveNavUser = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const userQuery = UserQuery();
  const [becomeHost, setBecomeHost] = useState(false);

  function onClickDropDown() {
    setShowDropDown(!showDropDown);
  }

  function onBlurDropDown() {
    setShowDropDown(false);
  }

  return (
    <StyledContainer>
      <StyledUserContainer className="navbar-dropdown" onClick={onClickDropDown}>
        {userQuery.isLoading || userQuery.isError ? (
          <FontAwesomeIcon className="user" icon={faCircleUser} />
        ) : (
          userQuery.isSuccess && (
            <Avatar src={userQuery.data.user.image} size="30px" textSizeRatio={2} round={true} name={userQuery.data.user.first_name} />
          )
        )}
      </StyledUserContainer>
      <UserDropDown showDropDown={showDropDown} blur={onBlurDropDown} className="dropdown" />
    </StyledContainer>
  );
};
