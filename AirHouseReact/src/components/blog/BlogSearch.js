import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import CateDetail from "./CateDetail";
import Skeleton from "react-loading-skeleton";
import axiosClient from "api/axiosClient";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Hehe.scss";

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

export default function BlogSearch() {
  const [searchRs, setSearchRs] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search");

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/blog/${item.id}`);
  };

  useEffect(() => {
    const SearchRequest = async () => {
      const response = await axiosClient.get(`search/${searchValue}`); //async await phải nằm trong thân function bên trong callback, hem được để ở phạm vi callback
      setSearchRs(response.data);
    };
    SearchRequest();
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  return (
    <div className="blogs_search_conainer">
      <div className="list_blogs">
        {searchRs ? (
          searchRs.map((item) => (
            <div className="box_item">
              <div
                className="item"
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="box_image">
                  <img src={item.image} />
                </div>

                <p>{item.title}</p>
                <p>{formatCreatedAt(item.created_at)}</p>
              </div>
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
