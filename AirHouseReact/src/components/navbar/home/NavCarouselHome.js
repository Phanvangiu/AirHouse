import styled, { css } from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import "./carousel.css";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CategoryQuery } from "api/categoryApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const responsive = {
  reponsive_1: {
    breakpoint: { max: 1640, min: 1540 },
    items: 13,
  },
  reponsive_2: {
    breakpoint: { max: 1540, min: 1400 },
    items: 12,
  },
  reponsive_3: {
    breakpoint: { max: 1400, min: 1300 },
    items: 11,
  },
  reponsive_4: {
    breakpoint: { max: 1300, min: 1200 },
    items: 10,
  },
  reponsive_5: {
    breakpoint: { max: 1200, min: 1100 },
    items: 7,
  },
  reponsive_6: {
    breakpoint: { max: 1100, min: 1000 },
    items: 7,
  },
  reponsive_7: {
    breakpoint: { max: 1000, min: 900 },
    items: 6,
  },
  reponsive_8: {
    breakpoint: { max: 900, min: 800 },
    items: 5,
  },
  reponsive_9: {
    breakpoint: { max: 800, min: 744 },
    items: 7,
  },
  reponsive_10: {
    breakpoint: { max: 744, min: 650 },
    items: 6,
  },
  reponsive_11: {
    breakpoint: { max: 650, min: 550 },
    items: 5,
  },
  reponsive_12: {
    breakpoint: { max: 550, min: 450 },
    items: 4,
  },
  reponsive_13: {
    breakpoint: { max: 450, min: 350 },
    items: 3,
  },
  reponsive_14: {
    breakpoint: { max: 350, min: 0 },
    items: 2,
  },
};

const StyledItemContainer = styled.div`
  border: 0;
  background-color: white;
  border-bottom: 2px solid white;
  width: max-content;
  padding-top: 10px;
  gap: 10px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    padding-bottom: 10px;
  }

  & img {
    width: 1.5rem;
    display: block;
  }

  &:hover > p {
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  ${(props) => {
    if (props.$border === false) {
      return css`
        & > p {
          border-bottom: 2px solid rgba(255, 255, 255);
        }

        &:hover > p {
          border-bottom: 2px solid rgba(0, 0, 0, 0.3);
        }

        filter: opacity(0.6);

        &:hover {
          filter: opacity(1);
        }
      `;
    }

    if (props.$border === true) {
      return css`
        & > p {
          border-bottom: 2px solid rgba(0, 0, 0);
        }

        &:hover > p {
          border-bottom: 2px solid rgba(0, 0, 0, 1);
        }
      `;
    }
  }};
`;

const StyledCarousel = styled(Carousel)`
  & ${StyledItemContainer} {
    margin: auto;
  }
`;
const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
  display: grid;
  flex: 1;
  font-size: 14px;
`;

const StyledImgContainer = styled.div`
  & img {
    transition: all 0.5s ease-in-out;
  }

  & .img-skeleton {
    height: 1.2rem;
    border-radius: 50%;
    width: 1.2rem;
  }
`;

function SliderItem({ img, name, click, index, activeArr, id }) {
  const [loaded, setLoaded] = useState(false);
  const { setChosenProperty } = useStateContext();

  return (
    <StyledItemContainer
      onClick={() => {
        click();
        setChosenProperty(id);
      }}
      $border={activeArr[index]}
    >
      <StyledImgContainer className="blur-div">
        <img onLoad={() => setLoaded(true)} src={img} style={loaded ? { opacity: "1" } : { opacity: "0" }} />
        {loaded || <Skeleton className="img-skeleton" />}
      </StyledImgContainer>
      <p>{name}</p>
    </StyledItemContainer>
  );
}

const StyledSkeletonItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  & .top {
    height: 2rem;
    border-radius: 50%;
    width: 2rem;
  }

  & .down {
    height: 0.8rem;
    width: 4.5rem;
  }
`;

function SkeletonItem() {
  return (
    <StyledSkeletonItemContainer>
      <Skeleton className="top" />
      <Skeleton className="down" />
    </StyledSkeletonItemContainer>
  );
}

function NavCarouselHome() {
  let categoryActiveArr = Array(15).fill(false);
  categoryActiveArr[0] = true;
  const categoryQuery = CategoryQuery();
  const [active, setActive] = useState(categoryActiveArr);
  const { pageWidth, setChosenProperty } = useStateContext();

  useEffect(() => {
    if (categoryQuery.isSuccess) {
      setChosenProperty(categoryQuery.data[0].id);
      categoryActiveArr = Array(categoryQuery.data.length).fill(false);
      categoryActiveArr[0] = true;
      setActive(categoryActiveArr);
    }
  }, [categoryQuery.status]);

  function onClickSetActive(index) {
    const newList = active.slice();

    for (let i = 0; i < newList.length; i++) {
      newList[i] = false;
      if (i == index) {
        newList[i] = true;
      }
    }
    setActive(newList);
  }

  return (
    <StyledContainer>
      {pageWidth > 800 ? (
        <>
          {categoryQuery.isSuccess && (
            <StyledCarousel swipeable={false} arrows={true} containerClass="carousel-container" responsive={responsive}>
              {categoryQuery.isSuccess &&
                categoryQuery.data.map((item, index) => (
                  <SliderItem
                    id={item.id}
                    click={() => onClickSetActive(index)}
                    img={item.icon_image}
                    name={item.name}
                    key={item.name}
                    index={index}
                    activeArr={active}
                  />
                ))}
            </StyledCarousel>
          )}
        </>
      ) : (
        <>
          {categoryQuery.isSuccess && (
            <StyledCarousel arrows={false} centerMode={true} containerClass="carousel-container" responsive={responsive}>
              {categoryQuery.isSuccess &&
                categoryQuery.data.map((item, index) => (
                  <SliderItem
                    id={item.id}
                    click={() => onClickSetActive(index)}
                    img={item.icon_image}
                    name={item.name}
                    key={item.name}
                    index={index}
                    activeArr={active}
                  />
                ))}
            </StyledCarousel>
          )}
        </>
      )}
    </StyledContainer>
  );
}

export default NavCarouselHome;
