import React from "react";
import styled from "styled-components";
const StyleA = styled.a`
  text-decoration: none;
  font-style: 14px;
`;
const StyleValueTietle = styled.div`
  color: black;
  line-height: 18px;
  font-weight: 600;
`;
const StyledValueDetail = styled.div`
  color: #717171;
  line-height: 18px;
  font-weight: 400;
`;

const GetswaysItem = (props) => {
  return (
    <div>
      <StyleA href={props.linkValue}>
        <StyleValueTietle>{props.valueTitle}</StyleValueTietle>
        <StyledValueDetail>{props.valueDetail}</StyledValueDetail>
      </StyleA>
    </div>
  );
};

export default GetswaysItem;
