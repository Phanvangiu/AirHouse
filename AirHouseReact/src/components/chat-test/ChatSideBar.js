import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { UserQuery } from "api/userApi";
import Avatar from "react-avatar";

const StyledSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledChatItem = styled.div`
  display: flex;
  gap: 1rem;
  border: 1px solid black;
  padding: 1rem;
  cursor: pointer;
`;

export default function ChatSideBar({ userQuery, data, setChosenChannel }) {
  // const [active, setActive] = useState([]);

  const onRenderData = () => {
    const dataArr = [];

    for (let item of data) {
      if (item.from_email == userQuery.data.user.email) {
        dataArr.push({
          email: item.to_email,
          image: item.to_user_image,
          message: item.body,
          channel: item.chanel_name,
        });
      } else {
        dataArr.push({
          email: item.from_email,
          image: item.from_user_image,
          message: item.body,
          channel: item.chanel_name,
        });
      }
    }

    return dataArr;
  };

  const onClickChat = (channel) => {
    setChosenChannel(channel);
  };

  return (
    <StyledSideBarContainer>
      {onRenderData().map((item, index) => {
        return (
          <StyledChatItem key={index} onClick={() => onClickChat(item.channel)}>
            <Avatar src={item.image} size="30px" textSizeRatio={2} round={true} name={item.email} />
            <div>
              <p>{item.email}</p>
              <p>{item.message}</p>
            </div>
          </StyledChatItem>
        );
      })}
    </StyledSideBarContainer>
  );
}
