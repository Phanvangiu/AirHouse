import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  & .SideBar li {
    border-bottom: 1px solid #dee2e6;
  }

  & .SideBar {
    border: solid 1px #dee2e6;
    /* max-width: 10%; */
    text-align: left;
  }
  & .SideBar li {
    padding: 10px;
  }
  & .Link {
    text-decoration: none;
    color: black;
    font-size: medium;
  }
  & .Link:hover {
    color: red;
  }
`;

export default function () {
  return (
    <Box>
      <ul className="SideBar">
        <li>
          <Link to="detail" className="Link">
            Edit Profile
          </Link>
        </li>

        <li>
          <Link to="/user/profile/media" className="Link">
            Profile Photos
          </Link>
        </li>
        <li>Trust & Verification</li>
        <li>Review About You</li>
        <li>Review By You</li>
      </ul>
    </Box>
  );
}
