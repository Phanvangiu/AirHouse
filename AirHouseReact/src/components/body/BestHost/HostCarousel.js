import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "./BestCarousel.css";
import Comes from "./Comes";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div>
      <button
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
        id="button"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button id="button" onClick={() => next()}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};
const StyleSection = styled.section`
  /* padding: 0 115px 0; */
`;
const StyleH1 = styled.h1`
  padding-top: 30px;
  line-height: 52px;
  font-size: 56px;
`;
const StyleDivSpan = styled.div`
  font-size: 26px;
  line-height: 30px;
  font-weight: 400;
  margin-top: 16px;
`;
const HostCarousel = () => {
  return (
    <div className="Total">
      <div>
        <StyleSection>
          <section>
            <StyleH1>Become your best Host</StyleH1>
            <StyleDivSpan>
              <span>Resources to help you meet your goals</span>
            </StyleDivSpan>
          </section>
        </StyleSection>
        <div></div>
      </div>
      <div className="my-own-custom-container">
        <Carousel
          responsive={responsive}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
        >
          <Comes></Comes>
          <Comes></Comes>
          <Comes></Comes>
          <Comes></Comes>
          <Comes></Comes>
          <Comes></Comes>
        </Carousel>
      </div>
    </div>
  );
};

export default HostCarousel;
