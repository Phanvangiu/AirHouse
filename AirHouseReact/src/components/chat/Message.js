import { GetMessage, GetMessageQuery, SendMessageMutation } from "api/chatApi";
import { UserQuery } from "api/userApi";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import styled, { css } from "styled-components";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & form {
    width: 100%;

    & input {
      width: 100%;
      height: 3rem;
      border-radius: 5px;
      padding: 10px;
    }
  }

  & .Message-Container {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 1rem;
    gap: 2rem;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & p:nth-of-type(1) {
    font-weight: 600;
    font-size: 17px;
  }

  ${(props) => {
    if (props.$right == true) {
      return css`
        align-items: flex-end;
      `;
    }
  }}
`;

const StyledMessageContainer = styled.div`
  overflow-y: scroll;
  height: 500px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export default function Message(props) {
  const userQuery = UserQuery();
  const sendMessageMutation = SendMessageMutation();
  const [AllMessages, setAllMessages] = useState([]);
  const [allMessagesAfterSub, setAllMessagesAfterSub] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const formData = new FormData();
    formData.append("user_to_email", props.UserInfo.email);
    GetMessage(formData)
      .then((result) => {
        setAllMessages(result);
      })
      .catch((error) => {
        console.error(error);
      });

    //Pusher
    var pusher = new Pusher("014b8eb7bfaf79153ac0", {
      cluster: "ap1",
    });

    const channel_name = [userQuery.data.user.email, props.UserInfo.email].sort().join("-");
    var channel = pusher.subscribe(channel_name);
    channel.bind("my-event", function (data) {
      setAllMessagesAfterSub((pre) => [...pre, data]);
    });

    return () => {
      setAllMessagesAfterSub([]);
      channel.unsubscribe(channel_name);
    };
  }, [props.UserInfo.email]);

  const handleMessage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_to_email", props.UserInfo.email);
    formData.append("message", message);
    sendMessageMutation.mutate(formData);
    setMessage("");
  };

  const handleCallback = (item) => {
    props.callback(item);
  };

  return (
    <StyledBox>
      <StyledMessageContainer>
        <div className="Message-Container">
          {AllMessages.map((item, index) => {
            return (
              <StyledMessage $right={userQuery.data.user.email == item.from_email} key={index}>
                <p>{item.from_email}</p>
                <p>{item.body}</p>
              </StyledMessage>
            );
          })}
          {allMessagesAfterSub.map((item, index) => {
            return (
              <StyledMessage $right={userQuery.data.user.email == item.from_email} key={index}>
                <p>{item.from_email}</p>
                <p>{item.body}</p>
              </StyledMessage>
            );
          })}
        </div>
      </StyledMessageContainer>
      <form onSubmit={(e) => handleMessage(e)}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </StyledBox>
  );
}
