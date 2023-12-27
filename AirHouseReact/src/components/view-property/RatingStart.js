import { useQueryClient } from "@tanstack/react-query";
import { CreateStart, ReadStart } from "api/startApi";
import React, { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";
const StyledGroupVote = styled.div`
  border: 1px black solid;
  border-radius: 5px;
  max-width: 500px;
  height: 40px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;
  margin: 0 auto;
`;

const StyledPreview = styled.input`
  border: none;
  height: 40px;
  border: 1px solid #dddddd;
  padding: 5px;
  &:focus {
    border: none;
  }
`;
const StyledButtunVote = styled.button`
  height: 40px;
  border: none;
  color: white;
  font-size: 14px;
  background-color: rgba(255, 0, 17, 0.7);
  &:hover {
    background-color: rgba(255, 0, 17, 1);
  }
`;
const RatingStart = ({ property_id, page }) => {
  const createStart = CreateStart(property_id);
  const readStart = ReadStart(property_id);
  const preview = useRef(null);
  const [show, setShow] = useState(true);
  const queryClientRead = useQueryClient();

  const StyledMessage = styled.div`
    color: #717171;
    font-size: 14px;
    line-height: 1.5;
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem 0;
  `;
  // Sử dụng useEffect để cập nhật giá trị đánh giá từ server khi có dữ liệu
  useEffect(() => {
    if (readStart.isSuccess) {
      setShow(false);
      if (readStart.data.start != null) {
        setRating(readStart.data.start.start);
      }
    } else {
      setRating(0);
    }
  }, [readStart.status]);

  const [rating, setRating] = useState(0);
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    setShow(true);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVote();
    }
  };
  const queryClient = useQueryClient();
  const handleVote = () => {
    const formData = new FormData();
    if (rating >= 1 && preview.current && preview.current.value.trim() !== "") {
      formData.append("property_id", property_id);
      formData.append("rating", rating);
      formData.append("preview", preview.current.value);

      console.log("FormData content:");
      for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      createStart.mutate(formData, {
        onSuccess: () => {
          alert("success!");
          queryClient.invalidateQueries({
            queryKey: ["start", property_id],
          });
          queryClientRead.invalidateQueries({
            queryKey: ["startAll", property_id, page],
            exact: true,
          });
          queryClientRead.invalidateQueries({
            queryKey: ["readAverageStart", property_id],
            exact: true,
          });
          setShow(false);
          preview.current.value = "";
        },
        onError: (error) => {
          const response = error.response;
          if ((response.status = 404)) {
            alert("Not yet rented");
          }
        },
      });
    } else {
      alert("Please provide both a rating and a problem description.");
    }
  };
  return (
    <div>
      <div>
        <Rating onClick={handleRating} initialValue={rating} />
        <StyledMessage>{readStart.isSuccess && readStart.data.start.message}</StyledMessage>
      </div>
      <div>
        {show && (
          <StyledGroupVote>
            <StyledPreview ref={preview} type="text" placeholder="What is your problem?" onKeyDownCapture={handleKeyPress} />
            <StyledButtunVote onClick={handleVote}>Vote</StyledButtunVote>
          </StyledGroupVote>
        )}
      </div>
    </div>
  );
};

export default RatingStart;
