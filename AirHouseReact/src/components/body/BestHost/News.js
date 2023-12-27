import React from "react";
import styled from "styled-components";
const StyleBackground = styled.div`
  background-color: black;
  padding: 80px 115px;
  color: white;
`;

const StyleSessionGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  margin: 32px 0px;
`;
const StyleItemGrid = styled.div`
  padding: 32px 0px;
  border: 1px solid white;
  border-left: 0px;
  border-right: 0px;
`;
const StyleA = styled.a`
  text-decoration: none;
  color: white;
  font-size: 22px;
  line-height: 26px;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;
const StyleH2 = styled.h2`
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
`;
const StylePara = styled.p`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  margin-top: 16px;
`;
const StyleDate = styled.p`
  margin-bottom: 16px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
`;
const StyleAa = styled.a`
  font-size: 18px;
  color: white;
`;
const News = () => {
  return (
    <div>
      <StyleBackground>
        <section>
          <StyleH2>News</StyleH2>
          <StylePara>Get the latest hosting and company updates.</StylePara>
        </section>
        <StyleSessionGrid>
          <StyleItemGrid>
            <StyleDate>Sep 20, 2023</StyleDate>
            <div>
              <StyleA href="https://www.airbnb.com/">
                Community feedback inspired these Airbnb updates
              </StyleA>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleDate>Aug 17, 2023</StyleDate>
            <div>
              <StyleA href="https://www.airbnb.com/">
                Support Maui fire Survivors
              </StyleA>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleDate>Aug 16, 2023</StyleDate>
            <div>
              <StyleA href="https://www.airbnb.com/">
                Airbnb.org welcomes new board members
              </StyleA>
            </div>
          </StyleItemGrid>
        </StyleSessionGrid>
        <section>
          <StyleAa href="https://www.airbnb.com/">Explore more</StyleAa>
        </section>
      </StyleBackground>
    </div>
  );
};

export default News;
