import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Img from "assets/images/hosting-img/photos.jpg";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  min-height: 55rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSecion1 = styled.section`
  min-height: 10rem;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1rem;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const StyledSecion2 = styled.section``;

const StyledForm = styled.form`
  border-radius: 5px;
  padding: 30px 40px 20px 40px;
  overflow: auto;
  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2rem 5px;
  }
`;

const StyleText = styled.div`
  line-height: 30px;
  color: white;
  z-index: 99;

  h2 {
    font-size: 30px;
    margin-bottom: 20px;
  }

  p {
    font-size: 22px;
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 30px;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledTitle = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  background-color: #eeeeee;
  padding: 10px 20px;

  @media (max-width: 992px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const StyledBoderInput = styled.div`
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 40px;
  @media (max-width: 992px) {
    border: 1px solid #eeeeee;
  }
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  height: 45px;
  border: 1px solid #717171;
  padding: 0 10px;
  margin: 1rem;

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
  }
`;

const StyledButtonInput = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 10rem;
  gap: 10px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & div:nth-of-type(1) {
    height: 100%;
    grid-column: 1/3;
    grid-row: 1 /3;
  }

  input {
    width: 100%;
    font-size: 15px;
    display: none;
  }

  ${(props) => {
    if (props.$initial == true) {
      return css`
        grid-template-columns: 1fr;
        & button {
          min-height: 10rem;
        }
      `;
    }
  }}

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 15rem;
  }
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled.button`
  border: none;
  cursor: pointer;
  background-color: red;
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  transition: all 0.1s;

  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
`;

const StyledUploadImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  & .remove {
    cursor: pointer;
    background-color: white;
    border: none;
    margin: 1px;
  }
`;

const StyledUploadButton = styled.button`
  background-color: white;
  border: 1px dashed black;
  cursor: pointer;
`;

const Photos = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();
  const inputRef = useRef();

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    onSetActive(4);
  };

  const onClickNext = (ev) => {
    ev.preventDefault();

    if (state.images.length < 5) {
      alert("You must upload atleast 5 images");
      return;
    }

    onSetActive(6);
    onSetAvailable(6);
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) => allowedFileTypes.includes(file.type));

      if (!isValidFileType) {
        alert("Invalid file type! Please select a valid image file.");
        // Clear the file input if the file type is invalid
        ev.target.value = null;
        return;
      }

      dispatch({
        type: ACTIONS.CHANGE_IMAGES,
        next: [...state.images, ...ev.target.files],
      });
    }
  };

  const onClickUploadImg = (ev) => {
    ev.preventDefault();
    inputRef.current.click();
  };

  const onRemoveImg = (ev, file) => {
    ev.preventDefault();
    const newArr = state.images.filter((item) => item != file);

    dispatch({
      type: ACTIONS.CHANGE_IMAGES,
      next: newArr,
    });
  };

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledOverlay />
        <StyleText>
          <h2>Add your photos & videos</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        <StyledForm>
          <StyledBoderInput>
            <StyledTitle>Image</StyledTitle>
            <StyledButtonInput $initial={state.images?.length == 0 ? true : false}>
              {state.images &&
                Array.from(state.images).map((file, index) => {
                  return (
                    <StyledImageContainer>
                      <StyledUploadImageOverlay>
                        <button onClick={(ev) => onRemoveImg(ev, file)} className="remove">
                          remove
                        </button>
                      </StyledUploadImageOverlay>
                      <img src={URL.createObjectURL(file)} />
                    </StyledImageContainer>
                  );
                })}
              <StyledUploadButton onClick={onClickUploadImg}>Upload images</StyledUploadButton>
              <input ref={inputRef} onChange={handleImageChange} type="file" multiple />
            </StyledButtonInput>
          </StyledBoderInput>
          <StyledBoderInput>
            <StyledTitle>Video</StyledTitle>
            <StyledInput
              value={state.video}
              onChange={(ev) => {
                dispatch({ type: ACTIONS.CHANGE_VIDEO, next: ev.target.value });
              }}
              type="text"
              placeholder="Enter Youtube link here"
            ></StyledInput>
          </StyledBoderInput>
          <StyledGroupButon>
            <StyledLink onClick={onClickPrevious}>Back </StyledLink>
            <StyledLink onClick={onClickNext}>Next </StyledLink>
          </StyledGroupButon>
        </StyledForm>
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Photos;
