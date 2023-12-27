import React from "react";
import styled from "styled-components";
const StyleContainer = styled.div`
  padding: 64px 0;
  margin: 0 115px;
`;
const StyleH2 = styled.h2`
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
`;
const StyleP = styled.p`
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
`;
const StyleSession = styled.section`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 16px;
`;
const StylePic = styled.div`
  position: relative;
`;
const StyleImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px 12px 0 0;
  object-position: center;
`;
const StylePara = styled.div`
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 0 0 12px 12px;
`;
const StyleP1 = styled.div`
  font-size: 20px;
`;
const StyleP2 = styled.div`
  font-size: 18px;
  color: #dddddd;
  margin-top: 14px;
`;
const Learning = () => {
  return (
    <div>
      <StyleContainer>
        <section>
          <StyleH2>Learning</StyleH2>
          <StyleP>Article and video series to help you get started.</StyleP>
        </section>
        <StyleSession>
          <div>
            <StylePic>
              <a href="https://www.airbnb.com/">
                <StyleImg
                  src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/bltd3d2014b2b871573/64d27fdb5b6dc1b15cbbe87f/HERO_UPDATED_(1).png?crop=39.82p,100p,x28.59p,y0&width=432&height=513&auto=webp"
                  alt="Pic"
                />
              </a>
            </StylePic>
            <StylePara>
              <StyleP1>Learning series: Rooms</StyleP1>
              <StyleP2>Learning</StyleP2>
            </StylePara>
          </div>
          <div>
            <StylePic>
              <a href="https://www.airbnb.com/">
                <StyleImg
                  src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt93ad076a2d9ce4c5/644067a12e3f817bcbb2f908/host_rc_pricing_l_2x_en-US_(1).png?crop=32.1p,100p,x33.68p,y0&width=432&height=513&auto=webp"
                  alt="Pic"
                />
              </a>
            </StylePic>
            <StylePara>
              <StyleP1>Pricing Your Place</StyleP1>
              <StyleP2>Learning</StyleP2>
            </StylePara>
          </div>
          <div>
            <StylePic>
              <a href="https://www.airbnb.com/">
                <StyleImg
                  src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blta2361c6f814213fe/62a0fe2e57e5dc1b13083c7c/InclusionHub_TILE.jpg?crop=100p,86.8p,x0,y0&width=432&height=513&auto=webp"
                  alt="Pic"
                />
              </a>
            </StylePic>
            <StylePara>
              <StyleP1>How to be an even more inclusive Host</StyleP1>
              <StyleP2>Learning</StyleP2>
            </StylePara>
          </div>
          <div>
            <StylePic>
              <a href="https://www.airbnb.com/">
                <StyleImg
                  src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/bltb2fadf36b8956143/5f5a50763fc7e52e120b649d/Tile_Discovering_Hosting_jpg.jpg?crop=100p,87.76p,x0,y12.23p&width=432&height=513&auto=webp"
                  alt="Pic"
                />
              </a>
            </StylePic>
            <StylePara>
              <StyleP1>Discovering the world of hosting</StyleP1>
              <StyleP2>Learning</StyleP2>
            </StylePara>
          </div>
        </StyleSession>
      </StyleContainer>
    </div>
  );
};

export default Learning;
