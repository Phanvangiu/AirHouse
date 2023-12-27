import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPeople,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Avatar from "react-avatar";

import avatar8 from "assets/images/avatars/8.jpg";
import { useStateContext } from "contexts/ContextProvider";
import { memo } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { onLogout } from "api/userApi";
import { LogoutUserMutation } from "api/userApi";
import Loading from "components/Loading";

import avatar from "assets/images/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg";

const StyledButton = styled.button`
  text-decoration: none;
  background-color: inherit;
  border: none;
  color: inherit;
`;

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const logoutMutation = LogoutUserMutation();

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilPeople} className="me-2" />
          <StyledButton onClick={() => navigate("/admin/register")}>Register</StyledButton>
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={() => logoutMutation.mutate()} href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
