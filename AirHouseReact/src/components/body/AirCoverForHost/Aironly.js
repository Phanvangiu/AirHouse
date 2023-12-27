import React from "react";
import styled from "styled-components";

const StyleAir = styled.h2`
  margin-top: 50px;
  font-size: 40px;
  padding: 20px 0 40px 0;
  text-align: center;
  font-weight: 600;
`;
const StyleTable = styled.table`
  width: 100%;
`;
const StyleTH = styled.th`
  border-bottom: 1px solid;
  padding-bottom: 20px;
  font-size: 20px;
  color: var(--color1);
`;
const StyleTd = styled.td`
  border-bottom: 1px solid var(--color1);
  padding: 17px 0 17px 0;
  font-size: 18px;
  font-weight: 400;
  color: #222222;
`;
const StyleTr = styled.tr`
  :nth-child(2) {
    text-align: center;
    font-weight: 900;
    font-size: 18px;
    color: #13ab18;
  }
  :last-child {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #e12c32;
  }
`;
const StyleTdTick = styled.td`
  padding: 17px 0 17px 0;
  border-bottom: 1px solid var(--color1);
  color: #13ab18;
`;
const StyleTdFont = styled.td`
  font-size: 22px;
  font-weight: var(--font-weight-title);
  line-height: var(--line-height-title);
  border-bottom: 1px solid var(--color1);
  padding: 17px 0 17px 0;
`;

const Aironly = () => {
  return (
    <div>
      <StyleAir>Only Airbnb gives you AirCover</StyleAir>
      <StyleTable>
        <tr>
          <StyleTH></StyleTH>
          <StyleTH>Airbnb</StyleTH>
          <StyleTH>Competitors</StyleTH>
        </tr>
        <StyleTr>
          <StyleTdFont>Guest identity verification</StyleTdFont>
          <StyleTd>✔</StyleTd>
          <StyleTd>✔</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTdFont>Reservation screening</StyleTdFont>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTdFont>$3M damage protection</StyleTdFont>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTd>Art & valuables</StyleTd>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTd>Auto & boat</StyleTd>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTd>Pet damage</StyleTd>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTd>Income loss</StyleTd>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTd>Deep cleaning</StyleTd>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
        <StyleTr>
          <StyleTdFont>$1M liability insurance</StyleTdFont>
          <StyleTd>✔</StyleTd>
          <StyleTdTick>✔</StyleTdTick>
        </StyleTr>
        <StyleTr>
          <StyleTdFont>24-hour safety line</StyleTdFont>
          <StyleTd>✔</StyleTd>
          <StyleTd>✘</StyleTd>
        </StyleTr>
      </StyleTable>
    </div>
  );
};

export default Aironly;
