import React, { Component, useRef, useState } from "react";
import Slider from "react-slick";
import CarouselDetail from "./CarouselDetail";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { blogDetailArr } from "../../data/data";
import { AllBlogQuery } from "api/blogApi";
import { useQueryClient } from "@tanstack/react-query";

const StyleCarouselBlock = styled.div`
  background-color: #f7f7f7; //màu chuẩn của web

  display: block;
  max-width: 100rem;
  margin: 0 auto;
  margin-top: 7rem;
  padding: 3rem 0;
`;

const StyleCarouselTilte = styled.p`
  width: 60rem;
  margin: 1rem;
  font-size: 1.7rem;
  font-weight: 600;
  padding-left: 3rem;

  @media (max-width: 768px) {
    width: 100vw;
    font-size: 1.55rem;
    padding-left: 1rem;
  }
  @media (max-width: 576px) {
    width: 90vw;
    font-size: 1.3rem;
    padding-left: 1rem;
  }
`;

const StyleCarouselContent = styled.p`
  width: 37rem;
  margin: 1rem;
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 1.4rem;
  font-weight: 300;
  padding-left: 3rem;
  @media (max-width: 768px) {
    width: 90vw;
    font-size: 1.2rem;
    padding-left: 1rem;
  }
  @media (max-width: 576px) {
    width: 90vw;
    font-size: 0.9rem;
    padding-left: 1rem;
  }
`;

const StyleSlickButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 100rem;
  border: solid 1px lightgrey;
  background-color: none;
  margin: 0.2rem;
  color: grey;
`;

export default function BlogSlick() {
  // const sliderRef = useRef(null);

  // const next = () => {
  //   sliderRef.current.slickNext();
  // };

  // const previous = () => {
  //   sliderRef.current.slickPrev();
  // };

  const [slider, setSlider] = useState(null);

  const next = () => {
    slider.slickNext();
  };

  const previous = () => {
    slider.slickPrev();
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    initialSlide: 1,
    arrows: false, //ẩn mũi tên 2 bên
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
          infinite: true,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
          initialSlide: 5,
        },
      },
    ],
  };

  const queryClient = useQueryClient();
  const allBlogQuery = AllBlogQuery();
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <StyleCarouselBlock>
        <StyleCarouselTilte>
          One-of-a-kind stays, only on Airhouse
        </StyleCarouselTilte>
        <StyleCarouselContent>
          More people are turning to hosting for the first time. From community
          stories, to the latest Host earnings data and trends, discover how it
          has never been easier to host and earn on Airhouse.
        </StyleCarouselContent>
        <div style={{ textAlign: "right", paddingRight: "5%" }}>
          <StyleSlickButton style={{ cursor: "pointer" }} onClick={previous}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </StyleSlickButton>
          <StyleSlickButton style={{ cursor: "pointer" }} onClick={next}>
            <FontAwesomeIcon icon={faAngleRight} />
          </StyleSlickButton>
        </div>

        <Slider ref={setSlider} {...settings}>
          {allBlogQuery.isSuccess &&
            allBlogQuery.data &&
            allBlogQuery.data.items.length > 0 &&
            allBlogQuery.data.items.map((item, index) => (
              <div>
                <CarouselDetail item={item} key={index} />
              </div>
            ))}
        </Slider>
      </StyleCarouselBlock>
    </div>
  );
}
