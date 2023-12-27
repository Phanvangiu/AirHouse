import React from "react";
import Blogdetail from "./Blogdetail";
import { blogDetailArr } from "../../data/data";
import styled from "styled-components";
import { AllBlogQuery } from "api/blogApi";
import { useQueryClient } from "@tanstack/react-query";

const StyleLatestNewsBlock = styled.div`
  margin: 5rem;
  display: block;
  max-width: 100rem;
  margin: 0 auto;
  max-width: max-content;
  padding: 2rem 5rem;

  @media (max-width: 1024px) {
    padding: 1rem 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;
const StyledBlogList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  height: 100%;
  column-gap: 0.5rem;
  row-gap: 6rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const StyledTitle = styled.p`
  width: fit-content;
  color: black;
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default function LatestNews() {
  const queryClient = useQueryClient();
  const allBlogQuery = AllBlogQuery();
  console.log(allBlogQuery.data);

  return (
    <StyleLatestNewsBlock>
      <StyledTitle>Latest News</StyledTitle>
      <StyledBlogList>
        {allBlogQuery.isSuccess &&
          allBlogQuery.data &&
          allBlogQuery.data.items.length > 0 &&
          allBlogQuery.data.items.slice(0, 4).map((item, index) => {
            return (
              <div>
                <Blogdetail item={item} key={index} />
              </div>
            );
          })}
      </StyledBlogList>
    </StyleLatestNewsBlock>
  );
}
