import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";

const StylelLast = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;
const StyleH2 = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 44px;
  margin: 70px 0 16px 0;
`;
const StyleImg = styled.img`
  max-width: 625px;
`;
const StyleRight = styled.div`
  padding: 0 48px 0 16px;
  margin-bottom: 40px;
`;
const StyleRightDetail = styled.div`
  margin: 40px 0 16px 0;
  font-size: 18px;
  line-height: 24px;
  color: #717171;
`;
const StyleButton = styled.button`
  padding: 11px 24px 7px 24px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  background-color: #d70565;
  border: none;
  border-radius: 8px;
`;
const StyleA = styled.a`
  text-decoration: none;
  color: white;
`;
const LastAir = () => {
  return (
    <StylelLast>
      <div>
        <StyleImg
          src="https://a0.muscache.com/im/pictures/ec9ef413-8ca6-4b87-b788-5ee0ff5ec154.jpg"
          alt="Picture"
        />
      </div>
      <StyleRight>
        <StyleH2>The super easy way to Airbnb your place. </StyleH2>
        <StyleRightDetail>
          Airbnb Setup makes it easier to put your place on Airbnb, with
          hands-on help from a Superhost from your first question to your first
          guest.
        </StyleRightDetail>
        <StyleButton>
          <StyleA href="https://www.airbnb.com/">
            <FontAwesomeIcon
              icon={faHouseMedical}
              style={{ color: "#ffffff" }}
            />{" "}
            Airbnb Setup
          </StyleA>
        </StyleButton>
      </StyleRight>
    </StylelLast>
  );
};

export default LastAir;
