import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StyledBoxContainer from "../../../ui/StyledBoxContainer";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const StyledCarousel = styled(Carousel)`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 10px;

  &:hover .icon {
    display: block;
  }

  & .icon {
    width: 7px;
  }

  & .body-item-arrowleft,
  & .body-item-arrowright {
    display: none;
  }

  &:hover .body-item-arrowleft,
  &:hover .body-item-arrowright {
    display: inline;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonGroup = ({ max, next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;

  return (
    <div className="carousel-button-group-body">
      <button className={currentSlide === 0 ? "disable" : "body-item-arrowleft"} onClick={() => previous()}>
        <FontAwesomeIcon className="icon" icon={faChevronLeft} />
      </button>
      <button className={currentSlide === max - 1 ? "disable" : "body-item-arrowright"} onClick={() => next()}>
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </button>
    </div>
  );
};

const StyledItemContainer = styled.div`
  cursor: pointer;
  display: grid;
`;

const StyledInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.7rem;

  & .first-box {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & p:nth-of-type(1) {
      font-size: 15px;
      font-weight: 500;
    }

    & p:nth-of-type(4) {
      font-size: 14px;
      font-weight: 500;

      & span {
        font-weight: 300;
      }
    }
  }

  & .bed-info {
    font-size: 13px;
    font-weight: 300;
  }

  & .address {
    font-size: 13px;
    font-weight: 600;
  }

  & .second-box {
    font-size: 15px;
    font-weight: 600;

    & .start {
      color: rgba(255, 0, 0, 0.4);
    }
  }
`;

const StyledImgSkeleton = styled(Skeleton)`
  aspect-ratio: 1;
  height: 100%;
  width: 100%;
`;

const StyledImgContainer = styled.div`
  height: 100%;

  & img {
    aspect-ratio: 1;
  }
`;

function BodyItem({ data, click }) {
  const [loaded, setLoaded] = useState(false);

  const calRating = (ratings) => {
    let count = 0;
    let total = 0;

    for (let i = 0; i < ratings.length; i++) {
      total = total + ratings[i].start;
      count = count + 1;
    }

    return total / count ? (total / count).toFixed(1) : null;
  };

  return (
    <StyledItemContainer>
      <StyledCarousel
        dotListClass="custom-dot-list-style"
        showDots={true}
        customButtonGroup={<ButtonGroup max={data.images.length} />}
        arrows={false}
        responsive={responsive}
      >
        {data.images.map((img, index) => {
          return (
            <StyledImgContainer key={index} onClick={() => click(data.id)}>
              <LazyLoadImage effect="blur" width={"100%"} height={"100%"} src={img.image} />
            </StyledImgContainer>
          );
        })}
      </StyledCarousel>
      <StyledInfoBox onClick={() => click(data.id)}>
        <div className="first-box">
          <p>{data.name}</p>
          <p className="bed-info">
            {data.accomodates_count} guest {data.bedroom_count} Bedrooms {data.bathroom_count} Bathroom
          </p>
          <p className="address">
            {data.province?.full_name},{data.district.full_name}
          </p>
          <p>
            {data.base_price}$ <span>night</span>
          </p>
        </div>
        <p className="second-box">
          {calRating(data.rating) || ''} <FontAwesomeIcon className="start" icon={faStar} />

        </p>
      </StyledInfoBox>
    </StyledItemContainer>
  );
}

export default BodyItem;

const StyledItemSkeleton = styled(Skeleton)`
  width: 5rem;
  margin-top: 5px;
  position: relative;
`;

const StyledSkeletonContainer = styled.div`
  margin-top: 10px;
  position: relative;
  z-index: -1;
`;

export function BodyItemSkeleton() {
  return (
    <StyledItemContainer>
      <StyledCarousel
        dotListClass="custom-dot-list-style"
        showDots={true}
        customButtonGroup={<ButtonGroup max={1} />}
        arrows={false}
        responsive={responsive}
      >
        <StyledImgSkeleton />
      </StyledCarousel>
      <div>
        <StyledSkeletonContainer>
          <StyledItemSkeleton style={{ width: "90%" }} />
          <StyledItemSkeleton style={{ width: "70%" }} />
          <StyledItemSkeleton style={{ width: "40%" }} />
          <StyledItemSkeleton style={{ width: "40%" }} />
        </StyledSkeletonContainer>
      </div>
    </StyledItemContainer>
  );
}
