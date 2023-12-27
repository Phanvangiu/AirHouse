import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledCarouselDetail = styled.div`
  margin-top: 20rem;
  max-width: 40rem;
  height: 30rem;
  background-color: white;
  border-radius: 4%;
  border: solid lightgrey 1px;

  & a {
    font-weight: 500;
    font-size: 1.2rem;
    color: black;

    &:hover {
      text-decoration: underline;
    }
  }

  & p {
    margin-top: 1rem;
    color: lightslategray;
    font-weight: 300;
    font-size: 0.75rem;
  }
`;

const StyledImg = styled.img`
  border-top-right-radius: 4%;
  border-top-left-radius: 4%;
  width: 100%;
  object-fit: cover;
  height: 70%;
`;

export default function CarouselDetail({ item }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/blog/${item.id}`);
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  return (
    <StyledCarouselDetail
      onClick={handleItemClick}
      style={{ margin: "1rem 0.5rem" }}
    >
      <a href="">
        <StyledImg src={item.image} alt="" />
        <div
          style={{
            marginTop: " 1.6rem",
            marginLeft: "1rem",
            paddingRight: "0.5rem",
          }}
        >
          {item.title}
          <p>{formatCreatedAt(item.created_at)}</p>
        </div>
      </a>
    </StyledCarouselDetail>
  );
}

// export default function CarouselDetail({ item }) {
//   return (
//     <StyledCarouselDetail style={{ margin: " 1rem" }}>
//       <StyledImg src={item.image} alt="" />
//       <div style={{ marginTop: "1.6rem", marginLeft: "0.5rem" }}>
//         <a href={item.linkurl}>{item.title}</a>
//         <p>{item.date} </p>
//       </div>
//     </StyledCarouselDetail>
//   );
// }
