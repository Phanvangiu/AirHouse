import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { cilCloudUpload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import PopUpContainer from "ui/PopUpContainer";
import { useRef, useEffect } from "react";
import DefaultImg from "assets/default-img.webp";
import { useQueryClient } from "@tanstack/react-query";

//api import
import { CreateAmenitiesMutation, AmenitiesQueryId } from "api/amenitiesApi";
import {
  CreateBlogCategoryMutation,
  UpdateBlogCategoryMutation,
  BlogCategoryQueryId,
} from "../../api/blogCategoryApi";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  padding: 1rem;
  left: 53%;
  top: 20%;
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

export default function UpdateCategoryPopUp({
  chosenId,
  currentPage,
  setShowPopUp,
}) {
  const queryClient = useQueryClient();
  const BlogCategoryQuery = BlogCategoryQueryId(chosenId);
  const updateMutation = UpdateBlogCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (BlogCategoryQuery.isSuccess) {
      setCategoryName(BlogCategoryQuery.data.name);
    }
  }, [BlogCategoryQuery.status]);

  const onUpdateEvent = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("id", chosenId);
    formData.append("name", categoryName);

    updateMutation.mutate(formData, {
      onSuccess: () => {
        alert("Update success");
        setCategoryName("");
        setShowPopUp(false);
        setError(null);
        queryClient.invalidateQueries({
          queryKey: ["BlogCategory"],
        });
      },
      onError: (err) => {
        const response = err.response;
        setError(response.data.errors);
        console.log(response.data.errors);
      },
    });
  };

  const turnOffPopUp = () => {
    setShowPopUp(false);
  };

  return (
    <StyledPopUpContainer setShowPopUp={turnOffPopUp}>
      <StyledForm>
        <StyledInputField>
          <label>Category Name to update</label>
          <input
            onChange={(ev) => {
              setCategoryName(ev.target.value);
            }}
            type="text"
            placeholder="Category name"
            value={categoryName}
          />
        </StyledInputField>

        {error && (
          <div className="alert">
            {Object.keys(error).map((key) => (
              <div key={key}>{error[key]}</div>
            ))}
          </div>
        )}
        <StyledButtonRow>
          <button
            disabled={categoryName == ""}
            onClick={onUpdateEvent}
            className="submit-button"
          >
            Submit
          </button>
        </StyledButtonRow>
      </StyledForm>
    </StyledPopUpContainer>
  );
}
