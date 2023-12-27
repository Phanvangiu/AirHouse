import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const StyledFooter = styled.div`
  font-family: "Poppins", sans-serif;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(247, 247, 247);
`;

const StyledContainer = styled.div`
  width: 90%;
  margin: auto;

  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  align-items: center;

  @media only screen and (max-width: 1400px) {
    & {
      width: 93%;
    }
  }

  @media only screen and (max-width: 1200px) {
    & {
      width: 95%;
    }
  }
  @media only screen and (max-width: 992px) {
    & {
      width: 95%;
    }
  }
`;

const StyledLeftContent = styled.div`
  display: flex;
  gap: 7px;
  color: rgb(90, 90, 90);
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: rgb(90, 90, 90);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledShowButton = styled.button`
  background-color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledRightContent = styled.div``;

export default function FooterBarCreation() {
  return (
    <>
      <StyledFooter>
        <StyledContainer>
          <StyledLeftContent>
            <p>&#169; 2023 Airhouse, Inc.</p>
            <span>&#183;</span>
            <StyledLink>Terms</StyledLink>
            <span>&#183;</span>
            <StyledLink>Sitemap</StyledLink>
            <span>&#183;</span>
            <StyledLink>Privacy</StyledLink>
            <span>&#183;</span>
            <StyledLink>
              Your Privacy Choices <FontAwesomeIcon icon={faCheck} />
            </StyledLink>
          </StyledLeftContent>
          <StyledRightContent>
          </StyledRightContent>
        </StyledContainer>
      </StyledFooter>
    </>
  );
}
