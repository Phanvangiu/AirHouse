import { AllBlogQuery } from "api/blogApi";
import React from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const StyledBlogTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "column1 column2"; /* Đặt tên cho các vùng trong grid */

  max-width: 100rem;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "column2"
      "column1"; /* Đảo ngược thứ tự của các vùng trong grid */
    padding: 0;
  }
`;

const StyleIMG = styled.div`
  grid-area: column2; /* Gán cột 1 vào vùng có tên column1 */
  width: 100%;
  & img {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    border-radius: 8%;
  }
`;

const StyleContent = styled.div`
  grid-area: column1; /* Gán cột 1 vào vùng có tên column1 */
  width: 100%;
  padding: 1rem 3rem;
  margin-top: 1rem;
  & p {
    margin: 1rem;
    margin-left: 0;
    color: lightslategray;
    font-weight: 300;
    font-size: 1rem;

    @media (max-width: 786px) {
      font-size: 0.8rem;
    }

    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }

  & a {
    text-decoration: none;
    margin-top: 2rem;
    color: black;
    font-weight: 500;
    font-size: 2.1rem;
    line-height: 2.7rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 1024px) {
      font-size: 1.5rem;
      line-height: 2.3rem;
    }

    @media (max-width: 786px) {
      font-size: 1rem;
      line-height: 1.7rem;
      margin-top: 0;
      padding: 0;
    }

    @media (max-width: 600px) {
      font-size: 0.9rem;
      line-height: 1.5rem;
      margin-top: 0;
      padding: 0;
    }
  }

  & button {
    position: relative;
    display: block;
    margin: 2rem 0;

    border: none;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    font-weight: 500;
    font-size: 1rem;
    background-image: linear-gradient(
      90deg,
      #e61e4d 1.83%,
      #e31c5f 50.07%,
      #d70466 96.34%
    );
    color: white;
    cursor: pointer;

    @media (max-width: 786px) {
      padding: 0.7rem 1.2rem;
      font-size: 0.7rem;
      margin: 1.2rem 0;
    }

    @media (max-width: 600px) {
      padding: 0.5rem 0.8rem;
      font-size: 0.5rem;
      margin: 1rem 0;
    }
  }
`;

export default function BlogTop() {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(
      `/blog/${allBlogQuery.data.items[allBlogQuery.data.items.length - 1].id}`
    );
  };

  const queryClient = useQueryClient();
  const allBlogQuery = AllBlogQuery();
  console.log(allBlogQuery.data);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  return (
    <a href="" onClick={handleItemClick} style={{ textDecoration: "none" }}>
      {allBlogQuery.isSuccess &&
        allBlogQuery.data &&
        allBlogQuery.data.items.length > 0 && (
          <StyledBlogTop>
            <StyleContent>
              <p>
                {formatCreatedAt(
                  allBlogQuery.data.items[allBlogQuery.data.items.length - 1]
                    .created_at
                )}
              </p>
              <a href="">
                {
                  allBlogQuery.data.items[allBlogQuery.data.items.length - 1]
                    .title
                }
              </a>
              <button>Read more</button>
            </StyleContent>
            <StyleIMG>
              <img
                src={
                  allBlogQuery.data.items[allBlogQuery.data.items.length - 1]
                    .image
                }
                alt="blog-top-img"
              />
            </StyleIMG>
          </StyledBlogTop>
        )}
    </a>
  );
}
