import React, { useState } from "react";
import styled from "styled-components";
import { UpdateImageMutation } from "api/userApi";
import Avatar from "react-avatar";

const Box = styled.div`
  & .ContentProfilePhoto {
    padding: 2rem;
    display: flex;
    border: solid 1px #dee2e6;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
  }

  > div:nth-of-type(1) {
  }

  & .image {
    width: 200px;
    height: 200px;
  }
`;
export default function Content(props) {
  const imageMutation = UpdateImageMutation();

  const onImageChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    imageMutation.mutate(formData);
  };

  return (
    <Box>
      <div className="ContentProfilePhoto">
        <div>
          <Avatar size="200px" src={props.user.user.image} textSizeRatio={10} round={true} name={props.user.user.first_name} />
        </div>
        <div>
          <ul>
            <li>Please upload a clear photo to help hosts and guests to learn about each other.</li>
            <li>
              <form>
                <input type="file" onChange={onImageChange} />
              </form>
            </li>
          </ul>
        </div>
      </div>
    </Box>
  );
}
