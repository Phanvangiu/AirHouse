import React from "react";
import styled from "styled-components";

const ChatBox = styled.div`
  & .user-item-container {
    display: flex;
    flex-direction: column;
    
    height: 50px;
    border: solid thin black;
    cursor: pointer;
  }
`;
export default function UserItem(props) {
  return (
    <ChatBox>
      <div className="user-item-container">
        <div>
          {props.UserInfo.first_name} {props.UserInfo.last_name}
        </div>
        <div>{props.UserInfo.email}</div>
      </div>
    </ChatBox>
  );
}
