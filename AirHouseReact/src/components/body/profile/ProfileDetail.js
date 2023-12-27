import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSymbol } from "@fortawesome/fontawesome-svg-core";

const StyledProfile = styled.div``;

const StyledContainer = styled.div`
  max-width: 1150px;
  margin: auto;
  display: grid;
  grid-template-columns: 20rem 1fr;
`;

const StyledLeftContent = styled.form``;

const StyledRightContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`; 

const StyledInfoDetail = styled.div``;

export default function ProfileDetail() {
  return (
    <StyledProfile>
      <StyledContainer>
        <StyledLeftContent>
          <div>
            <img />
          </div>
          <button>Edit</button>
        </StyledLeftContent>
        <StyledRightContent>
          <h3>Your profile</h3>
          <p>
            The information you share will be used across Airbnb to help other guests and Hosts get to know you. Learn
            more
          </p>
          <StyledInfoDetail>
            
          </StyledInfoDetail>

          <h3>About you</h3>
        </StyledRightContent>
      </StyledContainer>
    </StyledProfile>
  );
}
