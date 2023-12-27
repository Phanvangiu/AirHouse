import React, { useEffect, useState } from "react";
import AboutSession from "./AboutSession";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleAbout = ["Support", "Hosting", "Airbnb"];
const link = "https://www.airbnb.com/";
const secondColumnLink = ["", "aircover-for-hosts", "/best-host", "", "", ""];

const SupportDetail = [
  "Help Center",
  "AirCover",
  " Anti-discrimination",
  "Disability support",
  "Cancellation options",
  "Report neighborhood concern",
];
const HostingDetail = [
  "Airbnb your home",
  "AirCover for Hosts",
  "Hosting resources",
  "Community forum",
  "Hosting responsibly",
  "Airbnb-friendly apartments",
];
const AirbnbDetail = ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"];

const StyleAbout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 40px;
  border-bottom: 1px solid #717171;
  padding-bottom: 50px;

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

  @media only screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 14px;
  margin-top: 3px;
`;

const StyleA = styled.a`
  display: block;
  text-decoration: none;
  font-style: 16px;
  color: black;
  font-size: 14px;
  font-weight: 400px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #717171;
  }
`;

const StyledFooter = styled.div`
  font-family: "Poppins", sans-serif;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 3;
  padding-top: 2rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const About = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".link");

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        document.body.classList.remove("no-scroll");
      });
    }
  }, []);

  return (
    <StyledFooter>
      <StyleAbout>
        <AboutSession
          title={TitleAbout[0]}
          item={SupportDetail.map((value, index) => (
            <StyleA href={link}>{value}</StyleA>
          ))}
        ></AboutSession>
        <AboutSession
          title={TitleAbout[1]}
          item={HostingDetail.map((value, index) => (
            <StyledLink key={index} className="link" to={secondColumnLink[index]}>
              {value}
            </StyledLink>
          ))}
        ></AboutSession>
        <AboutSession
          title={TitleAbout[2]}
          item={AirbnbDetail.map((value, index) => (
            <StyleA href={link}>{value}</StyleA>
          ))}
        ></AboutSession>
      </StyleAbout>
    </StyledFooter>
  );
};

export default About;
