import React from "react";
import styled, { css } from "styled-components";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Suspense } from "react";
import Loading from "components/Loading";
import { useNavigate } from "react-router-dom";

const StyledOption = styled.div`
  display: flex;
  margin-bottom: 5px;
  overflow-x: scroll;

  /* width */
  &::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const StyledOptionChoice = styled.button`
  padding: 8px 25px;
  border: 0;
  background-color: rgb(223, 219, 210);
  font-size: 14px;
  font-weight: 600;
  color: black;

  ${(props) => {
    if (props.$active === true) {
      return css`
        background-color: red;
        color: white;

        &:hover {
          color: white;
        }
      `;
    }
  }}

  ${(props) => {
    if (props.$disabled === true) {
      return css`
        cursor: auto;
        background-color: white;
        color: rgba(0, 0, 0, 0.4);

        &:hover {
          color: rgba(0, 0, 0, 0.4);
        }
      `;
    }
  }}
`;

export default function HostCreationContent() {
  const navigate = useNavigate();
  const [state, dispatch, ACTIONS, onSetAvailable, onSetActive, active, available] = useOutletContext();

  return (
    <>
      <StyledOption>
        <StyledOptionChoice $disabled={!available[0]} disabled={!available[0]} $active={active[0]}>
          Basic
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[1]} disabled={!available[1]} $active={active[1]}>
          Description
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[2]} disabled={!available[2]} $active={active[2]}>
          Details
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[3]} disabled={!available[3]} $active={active[3]}>
          Location
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[4]} disabled={!available[4]} $active={active[4]}>
          Amenities
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[5]} disabled={!available[5]} $active={active[5]}>
          Photo
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[6]} disabled={!available[6]} $active={active[6]}>
          Pricing
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[7]} disabled={!available[7]} $active={active[7]}>
          Booking
        </StyledOptionChoice>
        <StyledOptionChoice $disabled={!available[8]} disabled={!available[8]} $active={active[8]}>
          Calendar
        </StyledOptionChoice>
      </StyledOption>
      <Suspense fallback={<Loading />}>
        <Outlet context={[state, dispatch, ACTIONS, onSetActive, onSetAvailable]} />
      </Suspense>
    </>
  );
}
