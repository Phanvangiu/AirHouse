import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../../../assets/airbnb-logo-3023AC4CBA-seeklogo.com.png";
import logosvg from "assets/AIR house.svg"

const StyledImg = styled.img`
  height: 2rem;
`;

function NavLogo() {
  return (
    <Link to="/">
      <StyledImg src={logosvg} />
    </Link>
  );
}

export default NavLogo;
