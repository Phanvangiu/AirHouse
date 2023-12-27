import React, { useState } from "react";
import Getaways from "./Getaways";
import StyledHomePageContainer from "../../ui/StyledHomePageContainer";
import styled from "styled-components";
import GetswaysItem from "./GetswaysItem";
import About from "./About";
import FooterDetail from "./FooterDetail";
const itemTitleGetaway = [
  "Popular",
  "Arts & culture",
  "Outdoors",
  "Mountains",
  "Beach",
  "Unique stays",
  "Categories",
  "Things to do",
  "Airbnb-friendly apartments",
];
const itemPopular = [
  "Canmore",
  "Tucson",
  "Anaheim",
  "Benalmasdena",
  "Jasper",
  "Monterey",
  "Marbella",
  "Mountainview",
  "Paso Robles",
  "Mijas",
  "Devonport",
  "Santa Barbara",
  "Prescott",
  "Mallacoota",
  "Sonoma",
  "Scottsdale",
  "Ibiza",
  "Lasenrana",
  "Padstow",
];
const itemPopulardetail = [
  "Apartment rentals",
  "Vacation rentals",
  "Apartment rentals",
  "Vacation rentals",
  "Cabin rentals",
  "Apartment rentals",
  "Apartment rentals",
  "House rentals",
  "House rentals",
  "Vacation rentals",
  "Cottage rentals",
  "Cottage rentals",
  "Vacation rentals",
  "Beach house rentals",
  "Beach house rentals",
  "House rentals",
  "Apartment rentals",
  "Beachfront rentals",
  "Cottage rentals",
  "Beach house rentals",
];
const link = "https://www.airbnb.com/";
const titleGetaways = ["Inspiration for future getaways"];
const StyledContainer = styled(StyledHomePageContainer)`
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  background-color: rgb(247, 247, 247);
`;
const StyleFuture = styled.div`
  padding-top: 48px;
`;
const StyleListGetaways = styled.div`
  display: flex;
`;
const StyleGetaways = styled.button`
  color: #717171;
  background-color: inherit;
  border: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin: 6px 6px 8px -10px;
  padding: 10px;
  cursor: pointer;
  border-bottom: ${({ clicked }) => (clicked ? "2px solid black;" : "2px")};
  &:hover {
    border-bottom: 2px solid #dddddd;
    z-index: 2;
  }
`;
const StyleFutureGetaways = styled.div`
  margin-bottom: 8px;
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
`;
const StyleHr = styled.hr`
  color: 2px solid #dddddd;
  margin: -5px 0px 0px -10px;
`;
const StyleGetswaysItem = styled.div`
  display: grid;
  margin-top: 35px;
  margin-bottom: 45px;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  border-bottom: 1px solid #717171;
  padding-bottom: 48px;
`;


const Footer = () => {
  const [activeButton, setActiveButton] = useState(true);
  const handleClick = (status) => {
    setActiveButton(status);
  };
  return (
    <StyledContainer>
      <StyleFuture>
        <StyleFutureGetaways>{titleGetaways}</StyleFutureGetaways>
        <StyleListGetaways>
          {itemTitleGetaway.map((value, index) => (
            <StyleGetaways
              clicked={index === activeButton}
              onClick={() => handleClick(index)}
            >
              <Getaways value={<div>{value}</div>}></Getaways>
            </StyleGetaways>
          ))}
        </StyleListGetaways>
        <StyleHr></StyleHr>
        <StyleGetswaysItem>
          {itemPopular.map((value, index) => (
            <GetswaysItem
              key={index}
              linkValue={link}
              valueTitle={value}
              valueDetail={itemPopulardetail[index]}
            ></GetswaysItem>
          ))}
        </StyleGetswaysItem>
        <About></About>
        <FooterDetail></FooterDetail>
      </StyleFuture>
    </StyledContainer>
  );
};

export default Footer;
