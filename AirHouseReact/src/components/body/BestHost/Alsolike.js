import React from "react";
import styled from "styled-components";
const StyleCOntainer = styled.div`
  padding: 64px 0;
  margin: 0 115px;
`;
const StyleH2 = styled.h2`
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
`;
const StyleLink = styled.div`
  margin-top: 16px;
  font-size: 18px;
  line-height: 26px;
`;
const StyleSession = styled.section`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 64px;
  row-gap: 32px;
`;
const StylePic = styled.div`
  width: 130px;
  aspect-ratio: 1;
  position: relative;
`;
const StyleImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  object-position: center;
`;
const StyleContainerImg = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const StyleTitle = styled.div`
  margin-left: 24px;
`;
const StyleH2Img = styled.h2`
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
`;
const Stylespan = styled.span`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
`;

const StyleTitleDetail = styled.div`
  margin-top: 16px;
`;
const Alsolike = () => {
  return (
    <div>
      <StyleCOntainer>
        <section>
          <StyleH2>You might also like</StyleH2>
          <StyleLink>
            <a href="https://www.airbnb.com/">Explore more</a>
          </StyleLink>
        </section>
        <StyleSession>
          <StyleContainerImg>
            <StylePic>
              <StyleImg
                src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt5724ed0dd88be3d3/5dc0bd73daa3472043dc811f/2UV408K77PP7.jpg?crop=66.66p,100p,x8.42p,y0&width=450&height=450&auto=webp"
                alt="Picture"
              />
            </StylePic>
            <StyleTitle>
              <StyleH2Img>Get started on Airbnb</StyleH2Img>
              <StyleTitleDetail>
                <Stylespan>Book</Stylespan>
                <Stylespan>3 minutes</Stylespan>
              </StyleTitleDetail>
            </StyleTitle>
          </StyleContainerImg>
          <StyleContainerImg>
            <StylePic>
              <StyleImg
                src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt5724ed0dd88be3d3/5dc0bd73daa3472043dc811f/2UV408K77PP7.jpg?crop=66.66p,100p,x8.42p,y0&width=450&height=450&auto=webp"
                alt="Picture"
              />
            </StylePic>
            <StyleTitle>
              <StyleH2Img>Get started on Airbnb</StyleH2Img>
              <StyleTitleDetail>
                <Stylespan>Book</Stylespan>
                <Stylespan>3 minutes</Stylespan>
              </StyleTitleDetail>
            </StyleTitle>
          </StyleContainerImg>
          <StyleContainerImg>
            <StylePic>
              <StyleImg
                src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt5724ed0dd88be3d3/5dc0bd73daa3472043dc811f/2UV408K77PP7.jpg?crop=66.66p,100p,x8.42p,y0&width=450&height=450&auto=webp"
                alt="Picture"
              />
            </StylePic>
            <StyleTitle>
              <StyleH2Img>Get started on Airbnb</StyleH2Img>
              <StyleTitleDetail>
                <Stylespan>Book</Stylespan>
                <Stylespan>3 minutes</Stylespan>
              </StyleTitleDetail>
            </StyleTitle>
          </StyleContainerImg>
          <StyleContainerImg>
            <StylePic>
              <StyleImg
                src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt5724ed0dd88be3d3/5dc0bd73daa3472043dc811f/2UV408K77PP7.jpg?crop=66.66p,100p,x8.42p,y0&width=450&height=450&auto=webp"
                alt="Picture"
              />
            </StylePic>
            <StyleTitle>
              <StyleH2Img>Get started on Airbnb</StyleH2Img>
              <StyleTitleDetail>
                <Stylespan>Book</Stylespan>
                <Stylespan>3 minutes</Stylespan>
              </StyleTitleDetail>
            </StyleTitle>
          </StyleContainerImg>
        </StyleSession>
      </StyleCOntainer>
    </div>
  );
};

export default Alsolike;
