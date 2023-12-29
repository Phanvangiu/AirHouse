import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import CateDetail from "./CateDetail";
import Skeleton from "react-loading-skeleton";
import axiosClient from "api/axiosClient";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Hehe.scss";

const StyleTop = styled.div`
  font-size: 1.5rem;
  font-weight: 450;
  margin: 3rem;
  margin-left: 5rem;
`;

const StyleNotFound = styled.div`
  position: absolute;
  font-size: 2rem;
  font-weight: 300;
  color: lightgray;
`;
const StyleViewMore = styled.button`
  display: block;

  margin: 3.5rem;

  border: solid 0.8px black;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-weight: bolder;
  font-size: 0.8rem;
  background-color: white;
  cursor: pointer;
`;

export default function BlogSearch() {
  const navigate = useNavigate();
  const [searchRs, setSearchRs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const [notFound, setNotFound] = useState(false);
  const [totalResults, setTotalResults] = useState(0); // Số lượng kết quả

  const [viewMore, setViewMore] = useState(4);

  function viewMoreHandle() {
    setViewMore((prevViewMore) => prevViewMore + 4);
  }

  const handleItemClick = (item) => {
    navigate(`/blog/${item.id}`);
  };

  useEffect(() => {
    const SearchRequest = async () => {
      const response = await axiosClient.get(`search/${searchValue}`); //async await phải nằm trong thân function bên trong callback, hem được để ở phạm vi callback
      setSearchRs(response.data);
      setTotalResults(response.data.length); // Lưu số lượng kết quả
      setNotFound(response.data.length === 0);
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
    <>
      <StyleTop className="search-results-info">
        <p>
          Search Results for "{searchValue}" ({totalResults}
          {totalResults < 2 ? " result" : " results"})
          {/* Hiển thị thông tin kết quả */}
        </p>
      </StyleTop>
      <div className="blogs_search_conainer">
        <div className="list_blogs">
          {notFound ? (
            <StyleNotFound className="not-found-message">
              <p>Sorry, no results were found.</p>
            </StyleNotFound>
          ) : searchRs ? (
            searchRs.slice(0, viewMore).map((item) => (
              <div className="box_item" key={item.id}>
                <div className="item" onClick={() => handleItemClick(item)}>
                  <div className="box_image">
                    <img src={item.image} alt="Blog Image" />
                  </div>
                  <p>{item.title}</p>
                  <p>{formatCreatedAt(item.created_at)}</p>
                </div>
              </div>
            ))
          ) : (
            <Skeleton />
          )}

          {searchRs.length > viewMore ? (
            <StyleViewMore onClick={viewMoreHandle}>View more</StyleViewMore>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
