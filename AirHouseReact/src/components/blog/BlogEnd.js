import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const StyledBlogEnd = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: 100rem;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const StyleIMG = styled.div`
  width: 100%;
  & img {
    width: 90%;
    border-radius: 4%;

    @media (max-width: 600px) {
      width: 100%;
      border-radius: 4%;
      margin: 0 auto;
    }
  }
`;

const StyleContent = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  & .p1 {
    margin-top: 6rem;
    margin-left: 0;
    color: black;
    font-weight: 600;
    font-size: 1.8rem;
    @media (max-width: 1024px) {
      margin-top: 1.5rem;
      font-size: 1.5rem;
    }

    @media (max-width: 600px) {
      padding: 0;
      text-align: center;
      margin: 0 auto;
      font-size: 1rem;
    }
  }

  & .p2 {
    margin-top: 1rem;
    color: black;

    font-size: 1.6rem;
    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }

    @media (max-width: 600px) {
      text-align: center;
      padding: 0;
      font-size: 1.1rem;
    }
  }

  & button {
    position: relative;
    display: block;
    margin: 2rem 0;
    border: solid 1px black;

    border-radius: 10px;
    padding: 0.8rem 1.3rem;
    font-weight: 550;
    font-size: 0.85rem;
    background-color: white;
    color: black;
    cursor: pointer;
    @media (max-width: 768px) {
      margin: 1rem 0;
      padding: 0.8rem 1.3rem;
      font-size: 0.9rem;
      font-weight: bold;
    }
    @media (max-width: 600px) {
      margin: 1rem auto;
      padding: 0.6rem 1.1rem;
      font-size: 0.7rem;
      font-weight: bold;
    }
  }
`;

export default function BlogTop() {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate("/blog/160");
  };

  return (
    <StyledBlogEnd>
      <StyleContent>
        <p className="p1">What makes Airhouse, Airhouse</p>
        <p className="p2">A letter from our founders</p>
        <button onClick={handleItemClick}>Read more</button>
      </StyleContent>
      <StyleIMG>
        <img
          src="https://news.airbnb.com/wp-content/uploads/sites/4/2023/09/FoundersRauschSt_201203_001_photos_v2_x4_RET.jpg?w=1536"
          alt="blog-end-img"
        />
      </StyleIMG>
    </StyledBlogEnd>
  );
}
