import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const StyleContainer = styled.div`
  padding: 64px 0;
  margin: 0 115px;
`;
const StyleH = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyleH2 = styled.h2`
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
  padding-bottom: 30px;
  margin-top: 10px;
  border-bottom: 1px solid #717171;
  width: calc(50% - 10px);
`;
const StyleSession = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
`;
const StyleButton = styled.button`
  width: 100%;
  border: none;
  background-color: white;
  border-bottom: 1px solid #717171;
  text-align: end;
  padding-top: 25px;
  margin-top: 7px;
`;
const StyleButtonDetail = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  margin-bottom: 7px;
  &:nth-child(1) {
    font-size: 20px;
  }
`;
const StyleA = styled.a`
  text-decoration: none;
  color: black;
`;
const Topics = () => {
  return (
    <div>
      <StyleContainer>
        <StyleH>
          <StyleH2>Popular Topics</StyleH2>
          <StyleH2></StyleH2>
        </StyleH>
        <StyleSession>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>Why host</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>What it's like to host</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>Common questions</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>Design inspiration</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>Cleanliness</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
          <StyleButton>
            <StyleA href="https://www.airbnb.com/">
              <StyleButtonDetail>
                <p>Delighting gúets</p>
                <p>
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </StyleButtonDetail>
            </StyleA>
          </StyleButton>
        </StyleSession>
      </StyleContainer>
    </div>
  );
};

export default Topics;
<div></div>;
