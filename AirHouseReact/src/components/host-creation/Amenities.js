import React from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/amenities.jpg";
import { Link } from "react-router-dom";
import { AmenitiesQuery } from "api/amenitiesApi";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Loading from "components/Loading";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 55rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const StyledSecion1 = styled.section`
  min-height: 10rem;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1rem;
  @media (max-width: 992px) {
    width: 100%;
  }
`;
const StyledSecion2 = styled.section``;
const StyledForm = styled.form`
  border-radius: 5px;
  padding: 30px 40px 20px 40px;
  overflow: auto;
  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 30px 40px 0px 40px;
  }
`;
const StyleText = styled.div`
  line-height: 30px;
  color: white;
  z-index: 99;

  h2 {
    font-size: 30px;
    margin-bottom: 20px;
  }

  p {
    font-size: 22px;
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 30px;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StyledLable = styled.label`
  font-size: 16px;
  padding-left: 10px;
`;

const StyledTitle = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
  @media (max-width: 992px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;
const StyledAmenities = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 10px;
  }
`;
const StyledItemAmenities = styled.div`
  display: flex;
  align-items: center;
  input {
    font-size: 10px;
  }
`;
const StyledInput = styled.input`
  cursor: pointer;
  zoom: 1.5;
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled.button`
  cursor: pointer;
  border: none;
  background-color: red;
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  transition: all 0.1s;
  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;

const Amenities = () => {
  const amenitiesQuery = AmenitiesQuery();
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();

  const onUpdateAmenities = () => {
    const checkboxes = document.getElementsByName("amenities");
    const arr = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        arr.push(checkboxes[i].value);
      }
    }

    dispatch({ type: ACTIONS.CHANGE_AMENITIES, next: arr });
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();

    onUpdateAmenities();

    onSetActive(3);
  };

  const onClickNext = (ev) => {
    ev.preventDefault();

    onUpdateAmenities();

    onSetActive(5);
    onSetAvailable(5);
  };

  useEffect(() => {
    const checkboxes = document.getElementsByName("amenities");

    for (let i = 0; i < checkboxes.length; i++) {
      if (state.amenities.includes(checkboxes[i].value)) {
        checkboxes[i].checked = true;
      }
    }
    return () => {};
  }, []);

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>Add your amenities</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        {amenitiesQuery.isLoading ? (
          <Loading />
        ) : (
          <StyledForm>
            <StyledTitle>Essentials</StyledTitle>
            <StyledAmenities>
              {amenitiesQuery.isSuccess &&
                amenitiesQuery.data
                  .filter((amenity) => amenity.type == "essentials")
                  .map((amenity, index) => {
                    return (
                      <StyledItemAmenities key={index}>
                        <StyledInput name="amenities" value={amenity.id} type="checkbox" />
                        <StyledLable htmlFor="">{amenity.name}</StyledLable>
                      </StyledItemAmenities>
                    );
                  })}
            </StyledAmenities>

            <StyledTitle>Features</StyledTitle>
            <StyledAmenities>
              {amenitiesQuery.isSuccess &&
                amenitiesQuery.data
                  .filter((amenity) => amenity.type == "features")
                  .map((amenity, index) => {
                    return (
                      <StyledItemAmenities key={index}>
                        <StyledInput name="amenities" value={amenity.id} type="checkbox" />
                        <StyledLable htmlFor="">{amenity.name}</StyledLable>
                      </StyledItemAmenities>
                    );
                  })}
            </StyledAmenities>

            <StyledTitle>Location</StyledTitle>
            <StyledAmenities>
              {amenitiesQuery.isSuccess &&
                amenitiesQuery.data
                  .filter((amenity) => amenity.type == "location")
                  .map((amenity, index) => {
                    return (
                      <StyledItemAmenities key={index}>
                        <StyledInput name="amenities" value={amenity.id} type="checkbox" />
                        <StyledLable htmlFor="">{amenity.name}</StyledLable>
                      </StyledItemAmenities>
                    );
                  })}
            </StyledAmenities>

            <StyledTitle>Safety</StyledTitle>
            <StyledAmenities>
              {amenitiesQuery.isSuccess &&
                amenitiesQuery.data
                  .filter((amenity) => amenity.type == "safety")
                  .map((amenity, index) => {
                    return (
                      <StyledItemAmenities key={index}>
                        <StyledInput name="amenities" value={amenity.id} type="checkbox" />
                        <StyledLable htmlFor="">{amenity.name}</StyledLable>
                      </StyledItemAmenities>
                    );
                  })}
            </StyledAmenities>

            <StyledGroupButon>
              <StyledLink onClick={onClickPrevious}>Back </StyledLink>
              <StyledLink onClick={onClickNext}>Next </StyledLink>
            </StyledGroupButon>
          </StyledForm>
        )}
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Amenities;
