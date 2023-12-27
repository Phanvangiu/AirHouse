import React from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import styled from "styled-components";
import { UserQuery } from "api/userApi";
import Loading from "components/Loading";
import { Navigate } from "react-router-dom";

const Box = styled.div``;
export default function EditProflie() {
  const userQuery = UserQuery();

  return (
    <Box>
      <div className="containerSideBar">
        <Content user={userQuery.data} />
      </div>
    </Box>
  );
}
