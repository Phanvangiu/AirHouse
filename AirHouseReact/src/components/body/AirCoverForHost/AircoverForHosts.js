import React from "react";
import styled from "styled-components";
import Aironly from "./Aironly";
import AirQuestions from "./AirQuestions";
import LastAir from "./LastAir";
const StyleAirHome = styled.div`
  margin: auto;
  width: 100%;
  background-color: var(--color5);
  animation: effect 3s ease;
  @keyframes effect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const StyleAir = styled.div`
  margin: auto;
  max-width: 800px;
`;
const StyleAirTop = styled.div`
  font-size: 2.25rem;
  text-align: center;
  border-bottom: 1px solid var(--color3);
  padding-bottom: 100px;
`;
const StyleSpan1 = styled.span`
  text-align: center;
  color: var(--color6);
  font-size: 200px;
  font-weight: var(--font-weight-title);
`;
const StyleSpan2 = styled.span`
  text-align: center;
  color: var(--color4);
  font-size: 200px;
  font-weight: var(--font-weight-title);
`;
const StyleAirTopDiv = styled.div`
  text-align: center;
  font-size: 80px;
  padding-bottom: 30px;
`;
const StyleTop = styled.div`
  font-size: 40px;
`;
const StyleAirPara = styled.div`
  padding: 30px 0 30px 0;
  border-bottom: 1px solid var(--color3);
`;
const StyleAirParaH2 = styled.h2`
  font-weight: 580;
  font-size: 26px;
  line-height: 30px;
`;
const StyleAirParaDiv = styled.div`
  color: var(--color2);
  font-size: 18px;
  font-weight: 400;
`;
const StyleAirParaDiv2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  padding-top: 10px;
`;
const StyleAirParaDiv2Dtail = styled.div`
  border-bottom: 1px solid var(--color3);
`;
const StyleAirParaDiv2H2 = styled.h2`
  font-size: 18px;
  color: var(--color1);
  padding-top: 10px;
  padding-bottom: 5px;
  padding-top: 10px;
`;
const StyleAirParaDiv2p = styled.p`
  font-size: 16px;
  width: 70%;
  color: var(--color2);
  padding-bottom: 20px;
`;
const StyleHr = styled.hr`
  margin-top: 80px;
  color: #717171;
`;
const AircoverForHosts = () => {
  return (
    <div>
      <StyleAirHome>
        <StyleAir>
          <StyleAirTop>
            <div>
              <StyleSpan1>air</StyleSpan1>
              <StyleSpan2>cover</StyleSpan2>
            </div>
            <StyleAirTopDiv>for Host</StyleAirTopDiv>
            <StyleTop>Top-to-bottom protection.</StyleTop>
            <StyleTop>Always included, always free.</StyleTop>
            <StyleTop>Only on Airbnb.</StyleTop>
          </StyleAirTop>
          <StyleAirPara>
            <StyleAirParaH2>Guest identity verification</StyleAirParaH2>
            <br />
            <StyleAirParaDiv>
              Our comprehensive verification system checks details such as name,
              address, government ID, and more to confirm the identity of guests
              who book on Airbnb.
            </StyleAirParaDiv>
          </StyleAirPara>
          <StyleAirPara>
            <StyleAirParaH2>Reservation screening</StyleAirParaH2>
            <br />
            <StyleAirParaDiv>
              Our proprietary technology analyzes hundreds of factors in each
              reservation and blocks certain bookings that show a high risk for
              disruptive parties and property damage.
            </StyleAirParaDiv>
          </StyleAirPara>
          <StyleAirPara>
            <StyleAirParaH2>$3M damage protection</StyleAirParaH2>
            <br />
            <StyleAirParaDiv>
              If guests do not pay for the damage caused to your home and
              belongings, Host damage protection is in place to help reimburse
              costs up to $3M USD, including these specialized protections:
            </StyleAirParaDiv>
            <div>
              <StyleAirParaDiv2>
                <StyleAirParaDiv2Dtail>
                  <StyleAirParaDiv2H2>Art & valuables</StyleAirParaDiv2H2>
                  <StyleAirParaDiv2p>
                    Get reimbursed for damaged art or valuables.
                  </StyleAirParaDiv2p>
                </StyleAirParaDiv2Dtail>
                <StyleAirParaDiv2Dtail>
                  <StyleAirParaDiv2H2>Auto & boat</StyleAirParaDiv2H2>
                  <StyleAirParaDiv2p>
                    Get reimbursed for damage to cars, boats, and other
                    watercraft that you park or store at your home.
                  </StyleAirParaDiv2p>
                </StyleAirParaDiv2Dtail>
              </StyleAirParaDiv2>
              <StyleAirParaDiv2>
                <StyleAirParaDiv2Dtail>
                  <StyleAirParaDiv2H2>Pet damage</StyleAirParaDiv2H2>
                  <StyleAirParaDiv2p>
                    Get reimbursed for damage caused by a guest’s pet.
                  </StyleAirParaDiv2p>
                </StyleAirParaDiv2Dtail>
                <StyleAirParaDiv2Dtail>
                  <StyleAirParaDiv2H2>Income loss</StyleAirParaDiv2H2>
                  <StyleAirParaDiv2p>
                    f you have to cancel Airbnb bookings due to guest damage,
                    you'll be compensated for the lost income.
                  </StyleAirParaDiv2p>
                </StyleAirParaDiv2Dtail>
              </StyleAirParaDiv2>
              <div>
                <StyleAirParaDiv2H2>Deep cleaning</StyleAirParaDiv2H2>
                <StyleAirParaDiv2p>
                  Get reimbursed for extra cleaning services needed after a
                  guest’s stay – for example, professional carpet cleaning.
                </StyleAirParaDiv2p>
              </div>
            </div>
          </StyleAirPara>
          <StyleAirPara>
            <StyleAirParaH2>$1M liability insurance</StyleAirParaH2>
            <br />
            <StyleAirParaDiv>
              Protection in the rare event that a guest gets hurt or their
              belongings are damaged or stolen.
            </StyleAirParaDiv>
          </StyleAirPara>
          <StyleAirPara>
            <StyleAirParaH2>24-hour safety line</StyleAirParaH2>
            <br />
            <StyleAirParaDiv>
              If you ever feel unsafe, our app provides one-tap access to
              specially-trained safety agents, day or night.
            </StyleAirParaDiv>
          </StyleAirPara>
          <Aironly></Aironly>
        </StyleAir>
        <AirQuestions></AirQuestions>
        <LastAir></LastAir>
        <StyleHr></StyleHr>
      </StyleAirHome>
    </div>
  );
};

export default AircoverForHosts;
