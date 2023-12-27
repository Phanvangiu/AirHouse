import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { cilCloudUpload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import PopUpContainer from "ui/PopUpContainer";
import { useRef } from "react";
import DefaultImg from "assets/default-img.webp";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

//api import
import { CategoryQueryId } from "api/categoryApi";
import { UpdateCategoryMutation } from "api/categoryApi";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h6 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: 500;
  }

  & label {
    font-size: 18px;
    font-weight: 500;
  }
`;

const StyledInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & input {
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  & input:focus {
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }

  & textarea {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  & textarea:focus {
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }
`;

const StyledButtonRow = styled.div`
  display: flex;
  flex-direction: row-;
  border-top: 1px solid black;
  padding-top: 1rem;

  & .submit-button {
    background-color: white;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.1s;
  }

  & .submit-button:focus {
    background-color: blue;
    color: white;
  }
`;

const StyledPopUpContainer = styled(PopUpContainer)`
  position: fixed;
  padding: 1rem;
  left: 53%;
  top: 15%;
  width: 27rem;

  @media only screen and (max-width: 500px) {
    width: 300px;
    left: 50%;
  }
`;

const StyledImgField = styled.div`
  display: flex;
  flex-direction: column;

  & input {
    display: none;
  }

  & .upload-icon {
    width: 30px;
    margin-right: 5px;
  }

  & button {
    background-color: blue;
    color: white;
    padding: 10px 0px;
    border: 0;
  }

  & img {
    height: 8rem;
    width: max-content;
    margin-bottom: 10px;
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }
`;

export default function UpdateCategoryPopUp({ currentPage, chosenId, setShowPopUp }) {
  const queryClient = useQueryClient();
  const categoryQuery = CategoryQueryId(chosenId);
  const updateMutation = UpdateCategoryMutation();

  const imgUploadRef = useRef();

  const [imgSrc, setImgSrc] = useState(DefaultImg);
  const [categoryName, setCategoryName] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");

  const onUploadImg = (ev) => {
    ev.preventDefault();
    imgUploadRef.current.click();
  };

  const checkChange = () => {
    if (imgUploadRef.current.files.length != 0) {
      setImgSrc(URL.createObjectURL(imgUploadRef.current.files[0]));
    }
  };

  const turnOffPopUp = () => {
    setShowPopUp(false);
    setImgSrc(DefaultImg);
  };

  useEffect(() => {
    if (categoryQuery.isSuccess) {
      setImgSrc(categoryQuery.data[0].icon_image);
      setCategoryName(categoryQuery.data[0].name);
      setDescription(categoryQuery.data[0].description);
    }
  }, [categoryQuery.status]);

  const onUpdateEvent = (ev) => {
    ev.preventDefault();

    const imgExtension = ["jpg", "png", "svg", "jpeg", "webp"];

    if (imgUploadRef.current.files[0]) {
      const imgArr = imgUploadRef.current.files[0].name.split(".");

      if (!imgExtension.includes(imgArr[imgArr.length - 1])) {
        alert("only accept img with format of jpg, png, svg, jpeg, webp");
        return;
      }
    }

    const formData = new FormData();
    formData.append("id", categoryQuery.data[0].id);
    formData.append("name", categoryName);
    formData.append("description", description);

    if (imgUploadRef.current.files[0]) {
      formData.append("icon_image", imgUploadRef.current.files[0]);
    }

    updateMutation.mutate(formData, {
      onSuccess: () => {
        alert("sucess update");
        queryClient.invalidateQueries({ queryKey: ["category", "page", currentPage] });
      },
      onError: (err) => {
        const response = err.response;
        console.log(response.data.errors);
      },
    });
  };

  return (
    <StyledPopUpContainer setShowPopUp={turnOffPopUp}>
      <StyledForm>
        <h6>{categoryQuery.isSuccess ? "ID: " + categoryQuery.data[0].id : <Skeleton />}</h6>
        <StyledInputField>
          <label>Category Name</label>
          <input
            onChange={(ev) => {
              setCategoryName(ev.target.value);
            }}
            type="text"
            placeholder="Category name"
            value={categoryName}
          />
        </StyledInputField>
        <StyledInputField>
          <label>Description</label>
          <textarea onChange={(ev) => setDescription(ev.target.value)} value={description} placeholder="Description"></textarea>
        </StyledInputField>
        <StyledImgField>
          <label>Icon</label>
          <input ref={imgUploadRef} accept="image/*" onChange={checkChange} type="file" />
          <img src={imgSrc} alt="img" />
          <button onClick={onUploadImg}>
            <CIcon icon={cilCloudUpload} customClassName="upload-icon" />
            Image Upload
          </button>
        </StyledImgField>
        <StyledButtonRow>
          <button
            onClick={onUpdateEvent}
            disabled={description == "" || categoryName == "" || imgSrc == DefaultImg}
            className="submit-button"
          >
            Update
          </button>
        </StyledButtonRow>
      </StyledForm>
    </StyledPopUpContainer>
  );
}
