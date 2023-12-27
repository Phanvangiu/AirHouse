import React, { useState } from "react";

import styled from "styled-components";
import LatestNews from "./LatestNews";
import BlogSlick from "./BlogSlick";
import BlogSlickUnder from "./BlogSlickUnder";
import Categories from "./Categories";
import BlogTop from "./BlogTop";
import BlogEnd from "./BlogEnd";
import BlogFollow from "./BlogFollow";
import axios from "axios";
import axiosClient from "api/axiosClient";
import { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AllBlogQuery } from "api/blogApi";
import Loading from "components/Loading";

const StyledSearchInput = styled.input`
  margin-top: 2rem;
  margin-left: 5rem;
  width: 50%;
  min-height: 3rem;
  padding: 0 1rem;
  border: solid 2px black;
  border-radius: 10rem;
  @media (max-width: 700px) {
    width: 90%;
    margin: 1rem 1rem;
  }
`;
const StyledSearchItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: white;
  transition: 0.3s; //tốc độ của scale
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.1rem gray;
  padding: 0.3rem;
  border: 0.05rem solid lightgray;
  cursor: pointer;

  & img {
    display: inline-block;
    width: 100%;
    object-fit: contain;
    border-radius: 5%;
  }

  & p {
    display: inline-block;
    font-size: 1.2rem;
    width: 100%;
    padding-left: 0.5rem;
    font-weight: 500;
    vertical-align: top;
    line-height: 1.2rem;
    height: 2.5rem;
    overflow: hidden;
    word-wrap: break-word;

    @media (max-width: 576px) {
      font-size: 0.7rem;
    }
  }

  &:hover {
    scale: 0.98; //nhỏ lại xíu lên khi hover dô
    box-shadow: 0 0 0.4rem gray;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const StyleSearchRsBlock = styled.div`
  ${({ active }) =>
    active &&
    css`
      /* outline: 1px solid lightslategray; */

      display: block;
      box-shadow: 0 0.1rem 0.3rem black;
      padding: 1rem;
      position: absolute;
      background-color: white;

      z-index: 200;

      height: 100%;
      max-height: 30rem;
      overflow-y: scroll;
      margin-top: 0.2rem;
      margin-left: 5rem;
      width: fit-content;
      max-width: 50rem;

      @media (max-width: 600px) {
        width: 100%;
        margin-left: 0;
      }
    `}
`;

export default function Blog() {
  const [searchRs, setSearchRs] = useState("");
  let timeoutId;

  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const search = async (event) => {
    const searchValue = document.getElementById("search");
    if (timeoutId) {
      clearTimeout(timeoutId); //clear timeout của request trước đó
    }
    timeoutId = setTimeout(async () => {
      //set timeout chờ với giá trị 200 trước khi gửi request sang backend, là mình ngưng gõ 200 thì nó mới gửi, nếu hem nó request nhiều qué (mỗi lần mình gõ là nó thay đổi => gửi request) nó sẽ báo lỗi
      if (searchValue.value.trim() !== "") {
        try {
          const response = await axiosClient.get(
            `search/${searchValue.value.trim()}`
          );
          setSearchRs(response.data);
        } catch (error) {
          console.error("Error:", error);
          // Handle the error appropriately
        }
      } else {
        setSearchRs("");
      }
    }, 200);

    if (event.key === "Enter") {
      const searchValue = document.getElementById("search").value.trim();
      navigate(`/blog/search-page?search=${searchValue}`);
    }
  };

  const allBlogQuery = AllBlogQuery();
  if(allBlogQuery.isLoading){
    return <Loading/>
  }
  return (
    <div>
      <div>
        <StyledSearchInput
          id="search"
          type="search"
          placeholder="What are you looking for..."
          onKeyDown={search}
        ></StyledSearchInput>
        <StyleSearchRsBlock active={searchRs != ""}>
          {searchRs
            ? searchRs.map((item) => (
                <StyledSearchItem onClick={() => handleItemClick(item.id)}>
                  <img src={item.image} alt="" />
                  <p>{item.title}</p>
                </StyledSearchItem>
              ))
            : ""}
        </StyleSearchRsBlock>
      </div>
      <BlogTop />
      <LatestNews />
      <BlogSlick />
      <BlogFollow />
      <BlogSlickUnder />
      <Categories />
      <BlogEnd />
    </div>
  );
}
