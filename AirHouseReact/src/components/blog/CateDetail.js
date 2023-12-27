import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyleCateDetail = styled.div`
  width: 100%;
  height: 10rem;
  text-align: left;
  max-height: 13rem;

  & a {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.5rem;
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 784px) {
      font-size: 1rem;
    }
  }

  & p {
    margin-top: 1rem;
    color: lightslategray;
    font-weight: 300;
    font-size: 0.85rem;

    @media (max-width: 784px) {
      font-size: 0.75rem;
    }
  }

  & img {
    width: 100%;
    object-fit: cover;
    border-radius: 9px;
    height: 10.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 784px) {
    /* min-width: 22rem;
    min-height: 13rem; */
    width: 100%;
  }

  @media (max-width: 430px) {
    /* min-width: 15rem;
    min-height: 13rem; */
    width: 100%;
  }
`;

export default function CateDetail({ item }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/blog/${item.id}`);
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  return (
    <StyleCateDetail onClick={handleItemClick}>
      <img src={item.image} alt="" />
      <div>
        <a href="">{item.title}</a>
        <p>{formatCreatedAt(item.created_at)} </p>
      </div>
    </StyleCateDetail>
  );
}
