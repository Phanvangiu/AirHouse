import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { cilSettings } from "@coreui/icons";
import { cilTrash } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { cilArrowThickFromLeft } from "@coreui/icons";
import { cilArrowThickFromRight } from "@coreui/icons";
import { cilArrowLeft } from "@coreui/icons";
import { cilPen } from "@coreui/icons";
import { cilArrowRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { PropertiesCurrentPageQuery } from "api/hostApi";
import { UserIdQuery } from "api/userApi";
import Avatar from "react-avatar";
import StatusPopUp from "./StatusPopUp";

const StyledContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
  overflow-x: hidden;
`;

const StyledTable = styled.table`
  text-align: center;
  flex-grow: 1;

  & th {
    font-weight: 600;
    font-size: 16px;
  }

  & .update-icon {
    height: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  & .update-icon:active {
    background-color: blue;
    color: white;
  }

  & .deleted-icon {
    height: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  & .deleted-icon:active {
    background-color: blue;
    color: white;
  }

  & .td_container {
    display: flex;
    text-align: left;
    align-items: center;
    gap: 1rem;

    & .td_left {
      cursor: pointer;
    }

    & .td_right {
      display: flex;
      flex-direction: column;
    }

    .td_right span:nth-of-type(1) {
      font-size: 16px;
      color: #3369ff;
      font-weight: 500;
    }

    .td_right span:nth-of-type(2) {
      font-size: 11px;
    }
  }
`;

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

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US");
};

export default function StatusAll({ status, filterState }) {
  const [clickPopUp, setClickPopUp] = useState(false);
  const [chosenId, setChosenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageQuery = PropertiesCurrentPageQuery(
    status,
    currentPage,
    filterState.search,
    filterState.category,
    filterState.roomType,
    filterState.propertyType,
    filterState.accomodates,
    filterState.bedroom,
    filterState.bookingType,
    filterState.status
  );

  if (currentPageQuery.isError) {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const totalItem = Number(currentPageQuery.data?.total || 0);
  const totalPage = Math.ceil(totalItem / 20);

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

  const onClickDetail = (id) => {
    setClickPopUp(true);
    setChosenId(id);
  };

  return (
    <StyledContainer>
      <StyledTable className="table table-responsive table-hover">
        <thead>
          <tr>
            <th>Code</th>
            <th className="status-name">Property</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Category</th>
            <th>Type</th>
            <th>Detail</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody className="table-body">
          {currentPageQuery.isLoading && (
            <tr>
              <td>
                <CSpinner color="primary" />
              </td>
            </tr>
          )}
          {currentPageQuery.isSuccess &&
            currentPageQuery.data.items.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td className="status-name" colSpan="5">
                    <span className="td_container">
                      <span className="td_left">
                        <Avatar src={data.user.image} size="30px" textSizeRatio={2} round={true} name={data.user.first_name} />
                      </span>
                      <span className="td_right">
                        <span>{data.name}</span>
                        <span>{data.acception_status.toUpperCase()}</span>
                      </span>
                    </span>
                  </td>
                  <td>{data.category.name}</td>
                  <td>{data.property_type.name}</td>
                  <td>
                    <CIcon onClick={() => onClickDetail(data.id)} icon={cilPen} customClassName="update-icon" />
                  </td>
                  <td>{formatDate(data.created_at)}</td>
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </StyledTable>
      {clickPopUp && <StatusPopUp status={status} currentPage={currentPage} chosenId={chosenId} setShowPopUp={setClickPopUp} />}
      <StyledPagination>
        <span>{totalItem} Total</span>
        <button onClick={onClickFirst} disabled={currentPage == 1}>
          <CIcon icon={cilArrowThickFromRight} customClassName="arrow thick-arrow-left" />
        </button>
        <button onClick={onClickPrevious} disabled={currentPage == 1}>
          <CIcon icon={cilArrowLeft} customClassName="arrow arrow-left" />
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
          <CIcon icon={cilArrowRight} customClassName="arrow arrow-right" />
        </button>
        <button onClick={onClickLast} disabled={currentPage == totalPage}>
          <CIcon icon={cilArrowThickFromLeft} customClassName="arrow thick-arrow-right" />
        </button>
      </StyledPagination>
    </StyledContainer>
  );
}
