import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import styled from "styled-components";

// const shareUrl = window.location.href;
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
`;
const shareUrl = "https://www.airbnb.com";
const Social = () => {
  return (
    <StyledContainer>
      <div className="Demo__some-network">
        <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <div>
          <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>
      <div>
        <div className="Demo__some-network">
          <TelegramShareButton url={shareUrl} className="Demo__some-network__share-button">
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
      </div>
      <div className="Demo__some-network">
        <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </StyledContainer>
  );
};

export default Social;
