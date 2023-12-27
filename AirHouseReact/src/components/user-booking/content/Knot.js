import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  & .title {
    padding: 10px;
  }
`;
export default function (props) {
  return (
    <StyledBox>
      <div className="title"> {props.title}</div>
    </StyledBox>
  );
}
