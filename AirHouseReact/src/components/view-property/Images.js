import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PopUpContainer from "ui/PopUpContainer";
import { useStateContext } from "contexts/ContextProvider";

const StyledContainer = styled.div`
`;

const StyledImageGroup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 200px 200px;
  gap: 5px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  .fisrtimage {
    grid-row: 1/3;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr;

    .fisrtimage {
      grid-row: 1/2;
    }
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 400px;

    .fisrtimage {
      grid-row: 1/2;
    }
  }
`;
const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
const StyledImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
const StyledPopup = styled(PopUpContainer)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: translate(0);
  overflow-y: scroll;
`;
const StyledPopupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  & .imagePopup {
    /* max-height: 50rem; */
    background-color: blue;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & .containerImage {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5rem 0;
  }
`;
const Styledbutton = styled.button`
  width: 40px;
  height: 40px;
  margin: 5rem;
  border: none;
  border-radius: 50%;
`;
const Images = ({ data }) => {
  const [clickImage, setclickImage] = useState(false);
  const { pageWidth } = useStateContext();
  let number = 5;

  if (pageWidth < 850) {
    number = 4;
  }

  if (pageWidth < 550) {
    number = 1;
  }

  return (
    <StyledContainer>
      {clickImage && (
        <StyledPopup setShowPopUp={setclickImage}>
          <StyledPopupContainer>
            <div>
              <Styledbutton onClick={() => setclickImage(false)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Styledbutton>
            </div>
            <div className="containerImage">
              {data.images.map((imageUrl, index) => {
                return (
                  <div key={index} className="imagePopup">
                    <img src={imageUrl} alt="" />
                  </div>
                );
              })}
            </div>
            <div></div>
          </StyledPopupContainer>
        </StyledPopup>
      )}
      <StyledImageGroup>
        {data.images.map((imageUrl, index) => {
          if (index < number) {
            return (
              <StyledImageContainer key={index} className={index === 0 ? "fisrtimage" : ""} onClick={() => setclickImage(true)}>
                <StyledImage key={index} src={imageUrl} />
                <StyledOverlay />
              </StyledImageContainer>
            );
          }
        })}
      </StyledImageGroup>
    </StyledContainer>
  );
};

export default Images;
