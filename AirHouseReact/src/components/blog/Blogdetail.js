import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledBlogdetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 13rem;
  gap: 1rem;
  width: 100%;
  max-width: 50rem;

  @media (max-width: 768px) {
    gap: 0;
  }

  & a {
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }

  & p {
    margin-top: 1rem;
    color: lightslategray;
    font-weight: 300;
    font-size: 0.75rem;
    @media (max-width: 768px) {
      font-size: 0.67rem;
    }
    @media (max-width: 576px) {
      font-size: 0.6rem;
    }
  }

  & img {
    max-width: 100%;
    object-fit: cover;
    border-radius: 9px;
  }
`;

export default function Blogdetail({ item }) {
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
    <a href="" onClick={handleItemClick} style={{ textDecoration: "none" }}>
      <StyledBlogdetail>
        <img src={item.image} alt="" />
        <div style={{ marginTop: "0.3rem", marginLeft: "1rem" }}>
          <a href="">{item.title}</a>
          <p>{formatCreatedAt(item.created_at)} </p>
        </div>
      </StyledBlogdetail>
    </a>
  );
}
