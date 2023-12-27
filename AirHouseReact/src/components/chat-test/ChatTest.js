import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatContent from "./ChatContent";
import Pusher from "pusher-js";
import { ChatUserQuery } from "api/chatApi";
import Loading from "components/Loading";
import { UserQuery } from "api/userApi";
import { ReadMessageQuery } from "api/chatApi";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  max-width: 80%;
  margin: 3rem auto;
  column-gap: 2rem;
`;

const StyledChat = styled.div``;

export default function ChatTest() {
  const userQuery = UserQuery();
  const chatUserQuery = ChatUserQuery();
  const [chosenChannel, setChosenChannel] = useState();
  const [messages, setMessages] = useState([]);
  const [channelList, setChannelList] = useState([{ channel: `${userQuery.data.user.email}-${userQuery.data.user.email}`, status: false }]);
  const [pusherChannel, setPusherChannel] = useState(null);
  const messageQuery = ReadMessageQuery(chosenChannel);

  const pusher = new Pusher("6685cbfa31bc0534f065", {
    cluster: "ap1",
  });

  useEffect(() => {
    Pusher.logToConsole = true;

    if (chatUserQuery.isSuccess) {
      for (let item of chatUserQuery.data) {
        for (let i = 0; i < channelList.length; i++) {
          if (channelList[i].channel == item.chanel_name) {
            break;
          }

          if (i == channelList.length - 1) {
            let newChannelList = [...channelList];
            newChannelList.push({
              channel: item.chanel_name,
              status: false,
            });

            setChannelList(newChannelList);
          }
        }
      }
    }

    channelList.map((item, index) => {
      if (item.status == false) {
        let ownChanel = pusher.subscribe(item.channel);
        ownChanel.bind("my-event", function (data) {
          chatUserQuery.refetch();
        });

        let newChannelList = [...channelList];
        newChannelList[index].status = true;

        setChannelList(newChannelList);
      }
    });

    return () => {
      channelList.map((item, index) => {
        if (item.status == true) {
          let ownChanel = pusher.unsubscribe(item.channel);
        }
      });
    };
  }, [chatUserQuery.fetchStatus, channelList]);

  useEffect(() => {
    function event(data) {
      messageQuery.refetch();
    }

    if (pusherChannel) {
      pusherChannel.unbind("my-event", event);
    }

    if (chosenChannel) {
      let channel = pusher.subscribe(chosenChannel);

      setPusherChannel(channel);

      channel.bind("my-event", event);
    }
  }, [chosenChannel]);

  if (chatUserQuery.isLoading) {
    return <Loading />;
  }

  return (
    <StyledContainer>
      <ChatSideBar userQuery={userQuery} setChosenChannel={setChosenChannel} data={chatUserQuery.data} />
      <ChatContent
        messageQuery={messageQuery}
        userQuery={userQuery}
        setMessages={setMessages}
        messages={messages}
        chosenChannel={chosenChannel}
      />
    </StyledContainer>
  );
}
