import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axiosClient from "api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { BookingItemSkeleton } from "./BookingItem";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & .PageNumber {
    & button {
      background-color: white;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 17px;
    }
  }
  & .PageNumberContainer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

const StyledItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 40rem;
`;

export default function Content(props) {
  const [secletedPage, setSecletedPage] = useState("1");
  let totalPage = null;
  const fethCurrentPage = async (secletedPage, UserTitle) => {
    const response = await axiosClient.get(`getBookingByUser?page=${secletedPage}&status=${UserTitle}`);
    return response.data;
  };

  const CurrentPageByUserQuery = (secletedPage, UserTitle) => {
    const titleQuery = useQuery({
      queryKey: ["booking", "title", "page", secletedPage, UserTitle],
      queryFn: () => fethCurrentPage(secletedPage, UserTitle),
      keepPreviousData: true,
      retry: 1,
    });
    return titleQuery;
  };

  const handlePagination = (pageNumber) => {
    window.scrollTo(0, 0);
    setSecletedPage(pageNumber);
  };
  const currentPageByUserQuery = CurrentPageByUserQuery(secletedPage, props.UserTitle);

  useEffect(() => {
    console.log(currentPageByUserQuery.data);
  }, [currentPageByUserQuery.isSuccess, props.UserTitle]);

  if (currentPageByUserQuery.isSuccess) {
    totalPage = Math.ceil(currentPageByUserQuery.data.total / 10);
  }

  if (currentPageByUserQuery.data?.data?.length === 0) {
    if (secletedPage > 1) {
      setSecletedPage(secletedPage - 1);
    }
  }

  if (currentPageByUserQuery.isLoading) {
    return (
      <StyledContainer>
        <BookingItemSkeleton />
        <BookingItemSkeleton />
        <BookingItemSkeleton />
        <BookingItemSkeleton />
        <BookingItemSkeleton />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledItems>
        {currentPageByUserQuery.data.data &&
          currentPageByUserQuery.data.data.map((item, index) => {
            return <BookingItem key={index} BookingItem={item} />;
          })}
      </StyledItems>
      <div className="PageNumberContainer">
        {Array(totalPage)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1;
            return (
              <span key={pageNumber} onClick={() => handlePagination(pageNumber)} className="PageNumber">
                <button>{pageNumber}</button>
              </span>
            );
          })}
      </div>
    </StyledContainer>
  );
}
