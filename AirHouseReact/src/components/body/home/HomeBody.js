import styled from "styled-components";
import "./home-body.css";
import BodyItem from "./BodyItem";
import StyledHomePageContainer from "../../../ui/StyledHomePageContainer";
import { PropertyIndexQuery } from "api/hostApi";
import { useStateContext } from "contexts/ContextProvider";
import { BodyItemSkeleton } from "./BodyItem";
import { useNavigate } from "react-router-dom";
import FilterBody from "./FilterBody";
import PropertyNotFound from "components/PropertyNotFound";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const StyledBody = styled.div``;

const StyledContainer = styled(StyledHomePageContainer)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.3rem;
  row-gap: 3.5rem;
  font-family: "Poppins", sans-serif;

  @media (max-width: 1879px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1640px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1127px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledObserve = styled.div`
  height: 1rem;
  background-color: blue;
  margin: 2rem 0;
`;

const StyledEnd = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: red;
  font-weight: 700;
  font-size: 18px;
  


`;

function HomeBody() {
  const { chosenProperty, state, clickFilter, setClickFilter } =
    useStateContext();
  const filterObj = {
    province: state.province,
    checkIn: state.checkIn,
    checkOut: state.checkOut,
    guest_count: state.accommodate,
  };

  const secondObj = {
    roomType: state.roomType,
    bed: state.bedRoom,
    bath: state.bathRoom,
    propertyType: state.propertyType,
    amenities: state.amenities,
  };

  const propertyQuery = PropertyIndexQuery(
    chosenProperty,
    filterObj,
    secondObj
  );
  const navigate = useNavigate();

  const onClickProperty = (id) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = `property?id=${id}`;
  };

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  // Load more items when the sentinel comes into view
  useEffect(() => {
    if (inView) {
      // Replace this with your function to load more items
      if (propertyQuery.hasNextPage) {
        propertyQuery.fetchNextPage();
      }
    }
  }, [entry]);

  if (propertyQuery.isLoading) {
    return (
      <StyledContainer>
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
        <BodyItemSkeleton />
      </StyledContainer>
    );
  }

  return (
    <StyledBody>
      {clickFilter && <FilterBody setShowPopUp={setClickFilter} />}
      <StyledContainer>
        {propertyQuery.isSuccess &&
          propertyQuery.data.pages.map((page, index) => {
            return page.data.map((item, index) => {
              return (
                <BodyItem
                  key={index}
                  click={onClickProperty}
                  data={item}
                  className="item"
                />
              );
            });
          })}
        {propertyQuery.isFetchingNextPage && (
          <>
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
            <BodyItemSkeleton />
          </>
        )}

        <div ref={ref}></div>
      </StyledContainer>
      {!propertyQuery.hasNextPage && <StyledEnd>Nothing more to show</StyledEnd>}
    </StyledBody>
  );
}

export default HomeBody;
