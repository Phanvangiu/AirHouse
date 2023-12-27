import React from "react";
import styled from "styled-components";
const StyleContainer = styled.div`
  padding: 50px 115px;
`;
const StyleSecsion = styled.section`
  padding: 48px 0;
`;
const StyleH2 = styled.h2`
  font-size: 26px;
  line-height: 28px;
  font-weight: 600;
  color: black;
`;
const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 32px;
  row-gap: 10px;
`;
const StyleItemGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const StyleH2Grid = styled.h2`
  font-size: 18px;
  font-weight: 600;
  padding: 20px 0;
`;
const StyleA = styled.a`
  text-decoration: none;
  color: black;
`;
const StyleAa = styled.a`
  text-decoration: none;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: #717171;
  &:hover {
    text-decoration: underline;
  }
`;
const StyleLink = styled.div`
  padding: 3px 0;
`;
const MoreTips = () => {
  return (
    <StyleContainer>
      <section>
        <StyleH2>Explore more topics</StyleH2>
      </section>
      <StyleSecsion>
        <StyleGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  Common question
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
          <StyleItemGrid>
            <StyleH2Grid>
              <StyleA href="https://www.airbnb.com/">
                Get started hosting
              </StyleA>
            </StyleH2Grid>
            <div>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">Why host</StyleAa>
              </StyleLink>
              <StyleLink>
                <StyleAa href="https://www.airbnb.com/">
                  What it's like to host
                </StyleAa>
              </StyleLink>
            </div>
          </StyleItemGrid>
        </StyleGrid>
      </StyleSecsion>
    </StyleContainer>
  );
};

export default MoreTips;
