import React from "react";
import styled from "styled-components";
import SideBar from "../EditProfile/SideBar";
import Content from "./Content";
import { UserQuery } from "api/userApi";
import Loading from "components/Loading";
import { Navigate } from "react-router-dom";

const Box = styled.div`
  & .containerProfilePhoto {
  }
`;
export default function ProfilePhoto() {
  const userQuery = UserQuery();

  return (
    <div>
      <Box>
        <div className="containerProfilePhoto">
          <Content user={userQuery.data} />
        </div>
      </Box>
    </div>
  );
}
