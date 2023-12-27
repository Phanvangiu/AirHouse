import React from "react";
import styled from "styled-components";

import NavBarContainer from "../../../ui/NavBarContainer";
import NavLogo from "../home/NavLogo";
import StyledButtonContainer from "../../../ui/StyledButtonContainer";


const StyledButton = styled(StyledButtonContainer)`
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:hover{
    border: 1px solid rgba(0, 0, 0, 0.7);
  }
`

export default function NavProduct() {
  return <NavBarContainer variant={"home"}>
    <NavLogo/>
    <div></div>
    <StyledButton>Save & Exit</StyledButton>

  </NavBarContainer>;
}
