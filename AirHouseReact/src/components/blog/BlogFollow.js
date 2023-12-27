import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const StyledBlogFl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;
  padding-top: 8%;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    font-size: 0.7rem;
  }
`;

const StyleLeft = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  @media (max-width: 768px) {
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr;
    & img {
      display: none;
    }
  }
`;
const StyleRight = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;

    & img {
      width: 100%;
    }
  }
`;

const StyleIMG_L = styled.div`
  width: 100%;
  & img {
    margin-left: 10%;
    width: 83%;
    border-radius: 1rem;
  }
`;
const StyleIMG_R = styled.div`
  width: 100%;

  & img {
    width: 83%;
    border-radius: 1rem;
    margin: 0 8.5%;
  }
`;
const StyleContent_L = styled.div`
  width: 100%;
  padding-top: 20%;
  padding-left: 30%;
  padding-right: 10%;
  font-size: 1.7rem;
  line-height: 2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding-left: 3rem;
    padding-right: 0;
    padding-top: 2rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;
const StyleContent_R = styled.div`
  width: 100%;
  padding-top: 20%;
  padding-right: 30%;
  font-size: 1.7rem;
  line-height: 2rem;
  font-weight: 600;

  & button {
    display: block;

    margin: 2rem 0;

    border: solid 0.8px black;
    border-radius: 10px;
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    font-size: 0.8rem;
    background-color: white;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.3rem;
    padding: 2rem 3rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

const StyleButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100rem;
  border: solid 1px black;
  background-color: white;
  margin: 1.5rem 0.5rem;
  color: grey;
`;

export default function BlogFollow() {
  return (
    <StyledBlogFl>
      <StyleLeft>
        <StyleContent_L>
          <p>Follow Airhouse for news and travel inspiration</p>
          <div>
            <a>
              <StyleButton style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon={faXTwitter}
                  size="xl"
                  style={{ color: "black" }}
                />
              </StyleButton>
            </a>
            <a>
              <StyleButton style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="xl"
                  style={{ color: "black" }}
                />
              </StyleButton>
            </a>
          </div>
        </StyleContent_L>
        <StyleIMG_L>
          <img
            src="https://news.airbnb.com/wp-content/uploads/sites/4/2023/05/Rudi-Road-Trip_D4_ListingID-11463775_0907.jpg?w=600"
            alt=""
          />
        </StyleIMG_L>
      </StyleLeft>
      <StyleRight>
        <StyleIMG_R>
          <img
            src="https://news.airbnb.com/wp-content/uploads/sites/4/2023/05/210521_JChou_BChesky_JCP4282_FNL.jpg?w=600"
            alt=""
          />
        </StyleIMG_R>
        <StyleContent_R>
          <p>Hear more from Co-founder and CEO Khloe Nguyen</p>
          <button>Learn more</button>
        </StyleContent_R>
      </StyleRight>
    </StyledBlogFl>
  );
}
