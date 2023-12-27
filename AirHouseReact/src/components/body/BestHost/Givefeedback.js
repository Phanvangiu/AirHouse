import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
const StyleContainer = styled.div`
  padding: 50px 115px 20px 115px;
`;
const StyleButtonDetail = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  &:nth-child(1) {
    font-size: 20px;
  }
`;
const StyleA = styled.a`
  font-size: 24px;
  text-decoration: none;
  color: black;
`;
const StyleAa = styled.a`
  color: black;
  font-size: 20px;
  padding: 8px;
`;
const StyleSpan = styled.span`
  margin-right: 12px;
`;
const StyleTitle = styled.div`
  padding: 44px 0 64px 0;
`;
const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  column-gap: 20px;
`;
const StyleItemGrid = styled.div`
  border: 1px solid #717171;
  border-radius: 12px;
  padding: 36px;
`;
const StyleHr = styled.hr`
  margin-top: 50px;
  color: #717171;
`;
const Givefeedback = () => {
  return (
    <StyleContainer>
      <StyleTitle>
        <StyleAa href="https://www.airbnb.com/">
          <StyleSpan>
            <FontAwesomeIcon icon={faBullhorn} />
          </StyleSpan>
          Give feedback
        </StyleAa>
      </StyleTitle>
      <StyleGrid>
        <StyleItemGrid>
          <div>
            <StyleA href="https://www.airbnb.com/">
              Join conversations with Hosts around the world
            </StyleA>
          </div>
          <StyleA href="https://www.airbnb.com/">
            <StyleButtonDetail>
              <p>Why host</p>
              <p>
                <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </StyleButtonDetail>
          </StyleA>
        </StyleItemGrid>
        <StyleItemGrid>
          <div>
            <StyleA href="https://www.airbnb.com/">
              Join conversations with Hosts around the world
            </StyleA>
          </div>
          <StyleA href="https://www.airbnb.com/">
            <StyleButtonDetail>
              <p>Why host</p>
              <p>
                <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </StyleButtonDetail>
          </StyleA>
        </StyleItemGrid>
      </StyleGrid>
      <StyleHr />
    </StyleContainer>
  );
};

export default Givefeedback;
