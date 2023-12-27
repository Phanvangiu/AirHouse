import React from "react";
import styled from "styled-components";
import { DefaultViewUserQuery } from "../../api/userApi";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { css } from "styled-components";
import { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const StyleCateBlock = styled.div`
  display: block;
  max-width: 100rem;
  margin: 0 auto;
  margin-bottom: 5rem;

  padding-top: 2rem;
  & .title {
    width: 60rem;
    margin: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
    padding-left: 3rem;
  }
`;

const StyleTabTop = styled.div`
  width: 100%;

  font-size: 1.7rem;
  font-weight: 600;

  @media (max-width: 576px) {
    margin: 1rem 1rem;
    padding-left: 0;
  }
`;

const StyleTabButton = styled.button`
  margin: 0.4rem;
  margin-left: 0;
  padding: 0.75rem 1.1rem;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: white;
  border: none;

  /* CSS cho trạng thái active */
  //sử dụng props của component (active) để kiểm tra xem nó có giá trị true hay k
  ${({ active }) =>
    active &&
    css`
      border-bottom: solid 2px red;
      color: red;
      box-sizing: border-box;
      font-weight: 600;
      pointer-events: none; /* Vô hiệu hóa sự kiện (hover)*/
    `}

  &:hover {
    color: red;
  }

  @media (max-width: 784px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.7rem;
  }
`;

const StyleTabBody = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  margin: 2rem 0;
  font-size: 1.1rem;

  @media (max-width: 1023px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

//phần trên là css từ file categories

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 5rem 2rem;
`;
const StyledLeft = styled.div`
  margin: 0 2rem;
  outline: 0.1rem whitesmoke solid;
  text-align: center;

  & div:nth-child(2) {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;
const StyledRight = styled.div`
  & .bold {
    font-weight: 500;
  }

  & p {
    margin: 0.8rem;
  }
`;

const StyledReview = styled.div`
  background-color: #efefef;
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: 450;
`;
const StyleCmt = styled.div`
  background-color: white;
  border: solid 0.01rem lightgrey;

  width: 100%;
  margin-top: 0.8rem;

  & p {
    font-weight: 500;
    font-size: 1.2rem;
  }

  & div {
    padding: 0.4rem 0.7rem;
    font-size: 0.9rem;
  }
`;

export default function DefaultViewDashboard() {
  const { id } = useParams();

  const { data, isSuccess } = DefaultViewUserQuery(id);
  if (isSuccess) {
    console.log(data.user.ratings);
  }

  const [tab, setTab] = useState(1);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  return (
    <>
      {isSuccess ? (
        <StyledLayout>
          <StyledLeft>
            <Avatar src={data.user.image} size="12rem" textSizeRatio={2} round={true} name={data.user.first_name} />
            <div>
              {data.user.email_verify_at === null ? (
                <div>
                  <FontAwesomeIcon icon={faTimes} style={{ color: "red", fontSize: "1.5rem" }} /> Identity Unverified
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green", fontSize: "1.5rem" }} /> Identity Verified
                </div>
              )}
            </div>
          </StyledLeft>
          <StyledRight>
            <div className="bold">
              <p style={{ fontSize: "1.7rem" }}>
                Hi, I'm {data.user.first_name} {data.user.last_name}
              </p>
              <p style={{ fontSize: "0.8rem", color: "gray" }}>Member since {formatCreatedAt(data.user.updated_at)} </p>
              <hr style={{ borderColor: "lightgrey", opacity: "0.3" }} />
            </div>

            <StyledReview>Review ({data.user.ratings.length})</StyledReview>
            <div>
              <StyleCateBlock>
                <StyleTabTop>
                  <StyleTabButton name="" value="1" onClick={() => setTab(1)} active={tab === 1}>
                    Review From Guests
                  </StyleTabButton>
                  <StyleTabButton name="" value="2" onClick={() => setTab(2)} active={tab === 2}>
                    Review From Hosts
                  </StyleTabButton>
                </StyleTabTop>
                <StyleTabBody>
                  {isSuccess && data ? (
                    <>
                      {data.user.ratings.slice(0, 4).map((item, index) => {
                        return (
                          <StyleCmt key={index}>
                            <p>{item.property.name}</p>

                            <div>
                              {[...Array(5)].map((_, index) => (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  style={{
                                    color: index < item.start ? "#ffcc00" : "#c0c0c0",
                                  }}
                                />
                              ))}
                            </div>
                            <div>{item.message}</div>
                          </StyleCmt>
                        );
                      })}
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </StyleTabBody>
              </StyleCateBlock>
            </div>
          </StyledRight>
        </StyledLayout>
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </>
  );
}

