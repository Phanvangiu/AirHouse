import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserQuery } from "api/userApi";
import NavHome from "components/navbar/home/NavHome";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import FooterBar from "components/footer/home/FooterBar";
import FooterIndex from "components/footer/host-creation/FooterIndex";
import NavTopHome from "components/navbar/home/NavTopHome";
import { CategoryQuery } from "api/categoryApi";
import { RoomTypeQuery } from "api/room-typeApi";
import { AmenitiesQuery } from "api/amenitiesApi";
import { PropertyTypeQuery } from "api/property-typeApi";
import { ProvinceQuery } from "api/locationApi";
import Loading from "components/Loading";
import { CategoryValueQuery } from "api/blogCategoryApi";

const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
  /* display: flex;
  justify-content: space-between;
  min-height: 100vh;
  flex-direction: column; */
`;

const StyledBody = styled.div`
  flex-grow: 1;
`;

export default function DefaultLayout() {
  const userQuery = UserQuery();
  const categoryQuery = CategoryQuery();
  const roomTypeQuery = RoomTypeQuery();
  const amenitiesQuery = AmenitiesQuery();
  const propertyQuery = PropertyTypeQuery();
  const provinceQuery = ProvinceQuery();
  const categoryValueQuery = CategoryValueQuery();
  const location = useLocation();

  if (
    provinceQuery.isLoading ||
    categoryQuery.isLoading ||
    roomTypeQuery.isLoading ||
    amenitiesQuery.isLoading ||
    propertyQuery.isLoading ||
    categoryValueQuery.isLoading
  ) {
    return <Loading />;
  }

  if (userQuery.isSuccess) {
    localStorage.setItem("ACCESS_TOKEN", userQuery.data.token);
  }

  return (
    <StyledContainer>
      {location.pathname === "/" ? <NavHome /> : <NavTopHome />}
      <StyledBody>
        <Outlet />
      </StyledBody>
      {location.pathname === "/" ? <FooterBar variant={"home"} /> : <FooterIndex />}
    </StyledContainer>
  );
}
