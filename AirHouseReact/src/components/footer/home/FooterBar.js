import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import About from "./About";
import Overlay from "../../../ui/Overlay";

const StyledOverlay = styled(Overlay)`
  z-index: 3;
`;

const StyledFooter = styled.div`
  font-family: "Poppins", sans-serif;

  ${(props) => {
    if (props.$variant === "home") {
      return css`
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        position: sticky;
        bottom: 0;
        background-color: white;
      `;
    }
  }}
`;

const StyledContainer = styled.div`
  ${(props) => {
    if (props.$variant === "home") {
      return css`
        width: 90%;
        margin: auto;

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
    }
  }}

  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  align-items: center;
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
  border: 0;
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

export default function FooterBar({ variant }) {
  const [isShowMain, setIsShowMain] = useState(false);

  const clickShow = () => {
    setIsShowMain(!isShowMain);
  };

  useEffect(() => {
    if (isShowMain === true) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isShowMain]);

  return (
    <>
      {isShowMain === false ? (
        <StyledFooter $variant={variant}>
          <StyledContainer $variant={variant}>
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
              <StyledShowButton onClick={clickShow}>
                Support & resources <FontAwesomeIcon icon={faChevronUp} />
              </StyledShowButton>
            </StyledRightContent>
          </StyledContainer>
        </StyledFooter>
      ) : (
        <>
          <StyledOverlay onClick={clickShow} />
          <About />
        </>
      )}
    </>
  );
}
