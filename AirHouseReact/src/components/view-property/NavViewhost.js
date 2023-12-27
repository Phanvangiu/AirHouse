import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import Social from "./Social";

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 0 0;
  margin: 1rem 0;
`;
const StyledShareSave = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  font-size: 15px;
  margin-right: 1rem;
`;
const StyledTitle = styled.h1`
  font-size: 23px;
  font-weight: 500;
  line-height: 30px;
`;
const NavViewhost = ({ data }) => {
  const [share, setShare] = useState(false);
  const handleShare = () => {
    setShare(!share);
  };
  return (
    <StyledNav>
      <StyledTitle>{data.name}</StyledTitle>
      <div onClick={handleShare}>
        {share ? (
          <Social />
        ) : (
          <StyledShareSave>
            <div>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </div>
            <div>Share</div>
          </StyledShareSave>
        )}
      </div>
    </StyledNav>
  );
};

export default NavViewhost;