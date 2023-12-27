import React, { useState } from "react";
import styled, { css } from "styled-components";
import { blogDetailArr } from "../../data/data";
import CateDetail from "./CateDetail";
import { CategoryValueQuery } from "api/blogCategoryApi";
import Blogdetail from "./Blogdetail";
import { AllBlogQuery } from "api/blogApi";
import { BlogQueryByCategoryId } from "../../api/blogApi";
import Skeleton from "react-loading-skeleton";

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
  margin: 0.5rem;
  font-size: 1.7rem;
  font-weight: 600;
  padding-left: 3rem;
  @media (max-width: 576px) {
    margin: 1rem 1rem;
    padding-left: 0;
  }
`;

const StyleTabButton = styled.button`
  margin: 0.4rem;
  max-width: max-content;
  border: solid 1px lightgrey;
  border-radius: 50px;
  padding: 0.75rem 1.1rem;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: white;

  /* CSS cho trạng thái active */
  //sử dụng props của component (active) để kiểm tra xem nó có giá trị true hay k
  ${({ active }) =>
    active &&
    css`
      border: solid 2px black;
      font-weight: 600;
      pointer-events: none; /* Vô hiệu hóa sự kiện (hover)*/
    `}

  &:hover {
    border: solid 1.2px black;
  }

  @media (max-width: 784px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.7rem;
  }
`;

const StyleTabBody = styled.div`
  margin: 2rem 3.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;

  column-gap: 1.5rem;
  row-gap: 13rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin: 1rem 1.5rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    margin: 1rem 1rem;
  }
`;

const StyleViewMore = styled.button`
  display: block;

  margin: 3.5rem;
  margin-top: 12rem;

  border: solid 0.8px black;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-weight: bolder;
  font-size: 0.8rem;
  background-color: white;
  cursor: pointer;
`;

export default function Categories() {
  const allBlogQuery = AllBlogQuery();

  const { data, isLoading } = CategoryValueQuery();

  const [tab, setTab] = useState("All");
  const [viewMore, setViewMore] = useState(8);

  function viewMoreHandle() {
    setViewMore((prevViewMore) => prevViewMore + 8);
  }

  if (allBlogQuery.isSuccess) {
    console.log(allBlogQuery.data.items);
  }

  return (
    <StyleCateBlock>
      <p className="title">Categories</p>
      <StyleTabTop>
        {!isLoading ? (
          <>
            <StyleTabButton
              name="category"
              value="All"
              onClick={() => setTab("All")}
              active={tab === "All"}
            >
              All
            </StyleTabButton>
            {data.map((blogCategory) => (
              <StyleTabButton
                key={blogCategory.id}
                name="category"
                value={blogCategory.id}
                onClick={() => setTab(blogCategory.id)}
                active={tab === blogCategory.id}
              >
                {blogCategory.name}
              </StyleTabButton>
            ))}
          </>
        ) : (
          <Skeleton />
        )}
      </StyleTabTop>
      <StyleTabBody>
        {allBlogQuery.isSuccess &&
        allBlogQuery.data &&
        allBlogQuery.data.items.length > 0 ? (
          <>
            {allBlogQuery.data.items
              .filter((item) => {
                // Kiểm tra xem thuộc tính categories có phải là mảng không
                const isCategoriesArray = Array.isArray(item.categories);

                return (
                  tab === "All" ||
                  (isCategoriesArray &&
                    item.categories.some((category) => category.id === tab))
                );
              })
              .slice(0, viewMore)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <CateDetail item={item} />
                  </div>
                );
              })}
          </>
        ) : (
          <Skeleton />
        )}
      </StyleTabBody>

      {allBlogQuery.isSuccess &&
      allBlogQuery.data &&
      allBlogQuery.data.items.length > viewMore ? (
        <StyleViewMore onClick={viewMoreHandle}>View more</StyleViewMore>
      ) : (
        <>
          <br />
          <br />
          <br />
        </>
      )}
    </StyleCateBlock>
  );
}
