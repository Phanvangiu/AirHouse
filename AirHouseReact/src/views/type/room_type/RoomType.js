import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { cilPlus } from "@coreui/icons";
import { cilSettings } from "@coreui/icons";
import { cilTrash } from "@coreui/icons";
import { cilSearch } from "@coreui/icons";
import { CSpinner } from "@coreui/react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { cilArrowThickFromLeft } from "@coreui/icons";
import { cilArrowThickFromRight } from "@coreui/icons";
import { cilArrowLeft } from "@coreui/icons";
import { cilArrowRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { DeleteRoomTypeMutation } from "api/room-typeApi";
import { RoomTypeQueryPage } from "api/room-typeApi";

import CreateRoomTypePopUp from "./CreateRoomTypePopUp";
import UpdateRoomTypePopUp from "./UpdateRoomTypePopUp";

const StyledRoomType = styled.div``;

const StyledContainer = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 7px;
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
`;

const StyledHeader = styled.div``;

const StyledCreateButton = styled.button`
  background-color: blue;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
  margin: 0 0 1.5rem 0;
  font-size: 18px;

  &:active {
  }

  & .create-icon {
    width: 25px;
    border: 1px solid white;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const StyledTable = styled.table`
  text-align: center;
  flex-grow: 1;

  & td {
    max-height: 3rem;
  }

  & th {
    font-weight: 600;
    font-size: 18px;
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

  & .data-name {
    text-align: left;
  }
`;

const StyledImg = styled.img`
  height: 2.3rem;
`;

const StyledSkeleton = styled(Skeleton)`
  min-height: 3rem;
`;

const StyledSearchInput = styled.input`
  margin-bottom: 1rem;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.2);
    outline: 1px solid rgba(0, 0, 255, 0.2);
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

const StyledSearchContainer = styled.div``;

export default function RoomType() {
  const [showCreatePopUp, setShowCreatePopUp] = useState(false);
  const [showUpdatePopUp, setshowUpdatePopUp] = useState(false);

  const [chosenId, setChosenId] = useState(null);
  const deleteMutation = DeleteRoomTypeMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  // setSearchParams({ page: 1 });

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("page")) || 10);
  const currentPageQuery = RoomTypeQueryPage(currentPage);
  const queryClient = useQueryClient();

  const totalItem = Number(currentPageQuery.data?.total || 0);
  const totalPage = Math.ceil(totalItem / 10);

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

  const onDeleteEvent = (id) => {
    if (window.confirm("are you sure?")) {
      deleteMutation.mutate(
        { id: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roomtype", "page", currentPage] });
          },
          onError: (error) => {
            const response = error.response;
            if (response.status == 403) {
              alert("Cant delete room type that has property using it");
            }
          },
        }
      );
    }
  };

  const onUpdateEvent = (id) => {
    setshowUpdatePopUp(true);
    setChosenId(id);
  };

  const onClickPrevious = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
      setSearchParams({ page: currentPage - 1, limit: 10 });
    }
  };

  const onClickNext = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      setSearchParams({ page: currentPage + 1, limit: 10 });
    }
  };

  const onClickFirst = () => {
    window.scrollTo(0, 0);
    if (currentPage >= 2) {
      setCurrentPage(1);
      setSearchParams({ page: 1, limit: 10 });
    }
  };

  const onClickLast = () => {
    window.scrollTo(0, 0);
    if (currentPage < totalPage) {
      setCurrentPage(totalPage);
      setSearchParams({ page: totalPage, limit: 10 });
    }
  };

  return (
    <StyledRoomType>
      <StyledHeader>
        <StyledCreateButton onClick={() => setShowCreatePopUp(true)}>
          <CIcon icon={cilPlus} customClassName="create-icon" />
          Create New Room Type
        </StyledCreateButton>
        {showCreatePopUp && <CreateRoomTypePopUp currentPage={currentPage} setShowPopUp={setShowCreatePopUp} />}
        {showUpdatePopUp && <UpdateRoomTypePopUp currentPage={currentPage} chosenId={chosenId} setShowPopUp={setshowUpdatePopUp} />}
      </StyledHeader>
      <StyledContainer>
        <StyledTable className="table table-responsive table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMG</th>
              <th className="data-name">NAME</th>
              <th></th>
              <th></th>
              <th></th>
              <th>UPDATE</th>
              <th>DELETE</th>
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
              currentPageQuery.data.items.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>R{data.id}</td>
                    <td>
                      <StyledImg src={data.icon_image} alt="where is " />
                    </td>
                    <td className="data-name" colSpan="4">
                      {data.name}
                    </td>
                    <td>
                      <CIcon onClick={() => onUpdateEvent(data.id)} icon={cilSettings} customClassName="update-icon" />
                    </td>
                    <td>
                      <CIcon onClick={() => onDeleteEvent(data.id)} icon={cilTrash} customClassName="deleted-icon" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
        <StyledPagination>
          <span>{totalItem} Total</span>
          <button onClick={onClickFirst} disabled={currentPage == 1}>
            <CIcon icon={cilArrowThickFromRight} customClassName="arrow thick-arrow-left" />
          </button>
          <button onClick={onClickPrevious} disabled={currentPage == 1}>
            <CIcon icon={cilArrowLeft} customClassName="arrow arrow-left" />
          </button>
          {paginate().map((page) => {
            return (
              <button
                onClick={() => {
                  setSearchParams({ page: page, limit: 10 });
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
                className={page == currentPage ? "active" : "unactive"}
                key={page}
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
    </StyledRoomType>
  );
}
