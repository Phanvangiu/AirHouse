import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserQuery } from "api/userApi";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import NavTopHome from "components/navbar/home/NavTopHome";
import FooterIndex from "components/footer/host-creation/FooterIndex";
import Loading from "components/Loading";
import { CategoryQuery } from "api/categoryApi";
import { RoomTypeQuery } from "api/room-typeApi";
import { AmenitiesQuery } from "api/amenitiesApi";
import { PropertyTypeQuery } from "api/property-typeApi";
import { ProvinceQuery } from "api/locationApi";
import { CategoryValueQuery } from "../api/blogCategoryApi";

const StyledMenu = styled.div`
  display: flex;
  background-color: red;
  gap: 0.7rem;
  padding-left: 5%;
  flex-wrap: wrap;

  & button {
    background-color: inherit;
    border: none;
    padding: 10px 0;
    color: white;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  }

  & button:hover {
    background-color: white;
    color: red;
  }
`;

const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
`;

export default function GuestLayout() {
  const navigate = useNavigate();
  const userQuery = UserQuery();
  const categoryQuery = CategoryQuery();
  const roomTypeQuery = RoomTypeQuery();
  const amenitiesQuery = AmenitiesQuery();
  const propertyQuery = PropertyTypeQuery();
  const provinceQuery = ProvinceQuery();
  const categoryValueQuery = CategoryValueQuery();

  if (
    userQuery.isLoading ||
    provinceQuery.isLoading ||
    categoryQuery.isLoading ||
    roomTypeQuery.isLoading ||
    amenitiesQuery.isLoading ||
    propertyQuery.isLoading ||
    categoryValueQuery.isLoading
  ) {
    return <Loading />;
  }

  if (userQuery.isError) {
    return <Navigate to="/" />;
  }

  return (
    <StyledContainer>
      <NavTopHome />
      <StyledMenu>
        <button onClick={() => navigate("/user/your-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/user/profile/detail")}>Profile</button>
        <button onClick={() => navigate("/user/listing")}>My Listing</button>
        <button onClick={() => navigate("/user/view-all-host-bookings")}>My Renting</button>
        <button onClick={() => navigate("/user/booking-list")}>My Bookings</button>
        <button onClick={() => navigate("/user/chat")}>Messages</button>
      </StyledMenu>
      <Outlet />
      <FooterIndex />
    </StyledContainer>
  );
}
