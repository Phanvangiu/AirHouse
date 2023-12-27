import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { SendMessageMutation } from "api/chatApi";
import { useQueryClient } from "@tanstack/react-query";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & form {
    display: flex;
    flex-direction: column;

    input {
      height: 5rem;
      border-radius: 5px;
    }
  }
`;

const StyledContent = styled.div`
  border: 1px solid black;
  height: 40rem;
  overflow-y: scroll;
`;

const StyledChat = styled.input``;

export default function ChatContent({ userQuery, chosenChannel, messages, setMessages, messageQuery }) {
  const queryClient = useQueryClient();

  const sendMessageMutation = SendMessageMutation();

  const onEnterMessage = (ev) => {
    ev.preventDefault();

    const channelArr = chosenChannel.split("-");
    let toEmail;

    if (channelArr[0] == userQuery.data.user.email) {
      toEmail = channelArr[1];
    } else {
      toEmail = channelArr[0];
    }
    const formData = new FormData();
    formData.append("email", toEmail);
    formData.append("message", ev.target[0].value);

    sendMessageMutation.mutate(formData, {
      onSuccess: () => {
        ev.target[0].value = "";
        queryClient.invalidateQueries({ queryKey: ["chat", "user"] });
      },
    });
  };

  useEffect(() => {
    if (messageQuery.isSuccess) {
      setMessages(messageQuery.data);
    }
  }, [messageQuery.fetchStatus]);

  const onRenderMessage = () => {
    
  }



  return (
    <StyledContainer>
      <StyledContent>
        {messages.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.from_email}</h2>
              <p>{item.body}</p>
            </div>
          );
        })}
      </StyledContent>
      <form onSubmit={onEnterMessage}>
        <StyledChat />
      </form>
    </StyledContainer>
  );
}
