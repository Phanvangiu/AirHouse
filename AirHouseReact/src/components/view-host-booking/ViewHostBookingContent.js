import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { AllHostBookingQuery } from "api/userBookingApi";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewHostBookingItem, {
  BookingItemSkeleton,
} from "./ViewHostBookingItem";

const StyledContainer = styled.div``;

const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
  transition: all 0.5s;

  & button {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 25%;
    cursor: pointer;
  }

  & .arrow {
    height: 1rem;
  }

  & .active {
    border: 2px solid rgba(0, 0, 255, 0.6);
  }

  & span {
    font-size: 17px;
  }
`;

const StyledContent = styled.div`
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 2rem;
`;

export default function ViewHostBookingContent({ choice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsQuery = AllHostBookingQuery(choice, currentPage);
  const totalItem = Number(bookingsQuery.data?.total || 0);
  const totalPage = Math.ceil(totalItem / 10);

  if (bookingsQuery.isLoading) {
    return (
      <StyledContainer>
        <StyledContent>
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
          <BookingItemSkeleton />
        </StyledContent>
      </StyledContainer>
    );
  }

  if (bookingsQuery.isError) {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const onClickPrevious = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNext = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onClickFirst = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(1);
    }
  };

  const onClickLast = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(totalPage);
    }
  };

  const paginate = () => {
    const paginate = [];

    if (currentPage - 2 > 0) {
      paginate.push(currentPage - 2);
    }

    if (currentPage - 1 > 0) {
      paginate.push(currentPage - 1);
    }

    paginate.push(currentPage);

    if (currentPage + 1 <= totalPage) {
      paginate.push(currentPage + 1);
    }

    if (currentPage + 2 <= totalPage) {
      paginate.push(currentPage + 2);
    }

    return paginate;
  };

  return (
    <StyledContainer>
      <StyledContent>
        {bookingsQuery.isSuccess &&
          bookingsQuery.data.data.map((data, index) => {
            return <ViewHostBookingItem key={index} data={data} />;
          })}
      </StyledContent>

      <StyledPagination>
        <span>{totalItem} Total</span>
        <button onClick={onClickFirst} disabled={currentPage == 1}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button onClick={onClickPrevious} disabled={currentPage == 1}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {paginate().map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
              className={page == currentPage ? "active" : "unactive"}
            >
              {page}
            </button>
          );
        })}
        <button onClick={onClickNext} disabled={currentPage == totalPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button onClick={onClickLast} disabled={currentPage == totalPage}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </StyledPagination>
    </StyledContainer>
  );
}
