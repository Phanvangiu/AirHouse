import React from "react";
import styled from "styled-components";

const StyledPropertyNotFound = styled.div`
  background-color: #f0f0f0;
  /* padding: 20px; */
  /* border-radius: 8px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledH2 = styled.div`
  font-size: 100px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #717171;
  font-weight: 600;
  text-align: center;
`;
const PropertyNotFound = () => {
  return (
    <StyledPropertyNotFound>
      <StyledH2>
        <div>
          404 <br />
          Property not found
        </div>
      </StyledH2>
    </StyledPropertyNotFound>
  );
};

export default PropertyNotFound;
