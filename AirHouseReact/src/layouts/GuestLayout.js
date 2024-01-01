import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserQuery } from "api/userApi";
import { Navigate } from "react-router-dom";
import styled, { css } from "styled-components";
import NavTopHome from "components/navbar/home/NavTopHome";
import FooterIndex from "components/footer/host-creation/FooterIndex";
import Loading from "components/Loading";
import { CategoryQuery } from "api/categoryApi";
import { RoomTypeQuery } from "api/room-typeApi";
import { AmenitiesQuery } from "api/amenitiesApi";
import { PropertyTypeQuery } from "api/property-typeApi";
import { ProvinceQuery } from "api/locationApi";
import { CategoryValueQuery } from "../api/blogCategoryApi";
import { useLocation } from "react-router-dom";

const StyledMenu = styled.div`
  display: flex;
  background-color: red;
  gap: 0.7rem;
  padding-left: 5%;
  flex-wrap: wrap;
`;

const StyledMenuButton = styled.button`
  background-color: inherit;
  border: none;
  padding: 10px 1rem;
  color: white;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;


  &:hover {
    background-color: white;
    color: red;
  }

  ${(props) => {
    if (props.$active) {
      return css`
        background-color: white;
        color: red;
      `;
    }
  }}
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

  const location = useLocation();

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

  const compareString = (str1, str2) => {
    let minLength = str1.length;
    if (str2.length < minLength) {
      minLength = str2.length;
    }

    return str1.substring(0, minLength) == str2.substring(0, minLength);
  };

  return (
    <StyledContainer>
      <NavTopHome />
      <StyledMenu>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/your-dashboard")}
          onClick={() => navigate("/user/your-dashboard")}
        >
          Dashboard
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/profile/")}
          onClick={() => navigate("/user/profile/detail")}
        >
          Profile
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/listing")}
          onClick={() => navigate("/user/listing")}
        >
          My Listing
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(
            location.pathname,
            "/user/view-all-host-bookings"
          )}
          onClick={() => navigate("/user/view-all-host-bookings")}
        >
          My Rentings
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/booking-list")}
          onClick={() => navigate("/user/booking-list")}
        >
          My Bookings
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/fees")}
          onClick={() => navigate("/user/fees")}
        >
        Payment
        </StyledMenuButton>
        <StyledMenuButton
          $active={compareString(location.pathname, "/user/chat")}
          onClick={() => navigate("/user/chat")}
        >
          Messages
        </StyledMenuButton>
        
      </StyledMenu>
      <Outlet />
      <FooterIndex />
    </StyledContainer>
  );
}
