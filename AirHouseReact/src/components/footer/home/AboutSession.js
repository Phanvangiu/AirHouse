import React from "react";
import styled from "styled-components";

const StyleH3 = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  margin-bottom: 12px;
`;
const StyleAGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 14px;
`;
const AboutSession = (props) => {
  return (
    <section>
      <StyleH3>{props.title}</StyleH3>
      <StyleAGrid>{props.item}</StyleAGrid>
    </section>
  );
};

export default AboutSession;
