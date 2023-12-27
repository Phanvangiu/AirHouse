import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserQuery } from "api/userApi";
import UserItem from "./UserItem";
import { GetAllUser, GetAllUserQuery } from "api/chatApi";
import Message from "./Message";
import { useLocation, useParams } from "react-router-dom";
import Pusher from "pusher-js";
import Loading from "components/Loading";

const ChatBox = styled.div`
  & .grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1rem;
    max-width: 1300px;
    margin: 2rem auto;
    padding: 1rem 2rem;
  }

  & .item1 {
    min-height: 200px;
    border: 1px solid black;
    padding: 10px;
  }

  & .item2 {
    min-height: 200px;
    border: 1px solid black;
    padding: 10px;
  }
`;

export default function Chat(props) {
  let data = useLocation();
  const userQuery = UserQuery();
  const [render, setRender] = useState("");
  const getAllUserQuery = GetAllUserQuery();
  const [allUser, setAllUSer] = useState([]);
  const [selectedUser, setSelectedUser] = useState(true);

  useEffect(() => {
    setAllUSer(getAllUserQuery.data);

    if (getAllUserQuery.isSuccess && data.state) {
      const isIncluded = getAllUserQuery.data.some((item) => item.email == data.state.user_Email);
      if (isIncluded) {
        console.log("true");
      } else {
        console.log("not true");
        const NewUser = {
          email: data.state.user_Email,
          first_name: data.state.first_Name,
          last_name: data.state.last_Name,
        };
        setAllUSer((pre) => [NewUser, ...pre]);

        console.log("alluser", allUser);
      }
    }
  }, [getAllUserQuery.isSuccess]);

  useEffect(() => {
    if (allUser) {
      console.log("alluser", allUser[0]);
      setSelectedUser(allUser[0]);
    }
  }, [allUser]);

  useEffect(() => {
    if (userQuery.isSuccess) {
      var pusher = new Pusher("014b8eb7bfaf79153ac0", {
        cluster: "ap1",
      });

      // console.log(userQuery.data.user.email);
      const channel_name = userQuery.data.user.email;
      var channel = pusher.subscribe(channel_name);
      channel.bind("my-event", function (data) {
        setRender("haha");
        console.log("subcribe channel");
        const NewUser = {
          email: data.from_email,
          first_name: "",
          last_name: "",
        };
        console.log(NewUser);
        if (NewUser && allUser) {
          const isIncluded = allUser.some((item) => item.email == NewUser.email);
          if (isIncluded) {
            console.log("true");
          } else {
            console.log("false");
            setAllUSer((pre) => [NewUser, ...pre]);
          }
        }
      });
    }
    return () => {
      const channel_name = userQuery.data.user.email;
      pusher.unsubscribe(channel_name);
    };
  }, [userQuery.isSuccess, allUser]);

  const changeSelectedUser = (item) => {
    setSelectedUser(item);
  };
  if (getAllUserQuery.isLoading) {
    return <Loading />;
  }

  if (getAllUserQuery.isError) {
    return <div>Error: </div>;
  }
  return (
    <ChatBox>
      <div className="grid-container">
        <div className="item1">
          {allUser &&
            allUser.map((item, index) => {
              return (
                <span key={index} onClick={() => changeSelectedUser(item)}>
                  <UserItem UserInfo={item} />
                </span>
              );
            })}
        </div>
        <div className="item2">{selectedUser && <Message UserInfo={selectedUser} />}</div>
        <div className="item3"></div>
      </div>
    </ChatBox>
  );
}
