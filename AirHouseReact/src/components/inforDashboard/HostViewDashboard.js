import React from "react";
import styled from "styled-components";
import { GuestViewUserQuery } from "../../api/userApi";
import Skeleton from "react-loading-skeleton";
import Avatar from "react-avatar";
import { faStar, faCheck, faTimes, faRectangleList, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "styled-components";
import { useState } from "react";

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
  margin: 3rem auto;
  max-width: 90rem;
`;
const StyledTopCard = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 1rem;
    border-radius: 15px;

    & p {
      font-weight: 500;
      margin-bottom: 0.7rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      & span:nth-child(1) {
        font-weight: 700;
      }

      & span {
        font-weight: 400;
      }
    }
  }
`;
const StyledLeft = styled.div`
  margin: 0;

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

const StyledIdentity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

export default function HostViewDashBoard() {
  const { data, isSuccess } = GuestViewUserQuery();
  const bookingsCount = data?.bookFromOthers;
  const tripsCount = data?.user?.bookings?.length || 0;
  console.log(data);
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
                <StyledIdentity>
                  <FontAwesomeIcon icon={faTimes} style={{ color: "red", fontSize: "1.5rem" }} /> Identity Unverified
                </StyledIdentity>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green", fontSize: "1.5rem" }} /> Identity Verified
                </div>
              )}
            </div>
          </StyledLeft>
          <StyledRight>
            <StyledTopCard>
              <div>
                <FontAwesomeIcon icon={faRectangleList} style={{ color: "violet", fontSize: "2.5rem" }} />
                <p>
                  <span>My Bookings</span> <span>{bookingsCount}</span>
                </p>
              </div>
              <div>
                <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: "lightgreen", fontSize: "2.9rem" }} />
                <p>
                  <span>My Rentings</span> <span>{tripsCount}</span>
                </p>
              </div>
            </StyledTopCard>

            <div className="bold">
              <p style={{ fontSize: "1.7rem" }}>
                Hi, I'm {data.user.first_name} {data.user.last_name}
              </p>
              <p style={{ fontSize: "0.8rem", color: "gray" }}>Member since {formatCreatedAt(data.user.updated_at)} </p>
              <hr style={{ borderColor: "lightgrey", opacity: "0.3" }} />
            </div>
            <div>
              <p className="bold" style={{ fontSize: "1.5rem" }}>
                About
              </p>
              <p style={{ fontSize: "0.8rem" }}>{data.user.about}</p>
            </div>
            <StyledReview>Review ({data?.user?.ratings?.length || 0})</StyledReview>
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
                      {data?.user?.ratings?.slice(0, 4).map((item, index) => {
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
