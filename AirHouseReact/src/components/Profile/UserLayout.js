import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./EditProfile/SideBar";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 3fr;
  gap: 1rem;
  max-width: 1450px;
  margin: 2rem auto 3rem;
`;

export default function UserLayout() {
  return (
    <StyledContainer>
      <SideBar />
      <Outlet />
    </StyledContainer>
  );
}
