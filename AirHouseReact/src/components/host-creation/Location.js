import React, { createRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Img from "assets/images/hosting-img/location.jpg";
import { ProvinceQuery } from "api/locationApi";
import { DistrictQuery } from "api/locationApi";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Loading from "components/Loading";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 3fr;
  min-height: 50rem;

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

const StyledSecion2 = styled.section`
  /* width: 60%; */
`;

const StyledForm = styled.form`
  border-radius: 5px;
  padding: 30px 40px 20px 40px;
  overflow: auto;
  @media (max-width: 992px) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2rem 5px;
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
    font-size: 20px;
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

const StyledGroupButon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled.button`
  background-color: red;
  border: none;
  cursor: pointer;
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  transition: all 0.1s;
  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const StyledCityDistrict = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & label {
    font-size: 15px;
  }

  div {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
`;

const StyledAddress = styled.div`
  display: flex;
  flex-direction: column;

  & .required {
    color: red;
  }

  & label {
    font-size: 15px;
  }
`;

const StyledSelect = styled.select`
  height: 40px;
  border-radius: 5px;
  border: 1px solid #717171;
  padding: 0 20px;
  cursor: pointer;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
    height: 40px;
  }
`;

const StyledInput = styled.input`
  height: 40px;
  border: 1px solid #717171;
  padding: 0 20px;
  margin: 10px 0 35px 0;
  border-radius: 5px;

  &:focus,
  &:hover {
    border: 1px solid red;
    outline: 1px solid red;
  }

  @media (max-width: 992px) {
    margin: 8px 0 20px 0;
  }
`;

const StyledBoderInput = styled.div`
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 40px;
  padding: 0;

  @media (max-width: 992px) {
    border: 1px solid #eeeeee;
  }
`;

const StyledTitle = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 25px;
  background-color: #eeeeee;
  padding: 10px 20px;

  @media (max-width: 992px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const StyledInputContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Location = () => {
  const [state, dispatch, ACTIONS, onSetActive, onSetAvailable] = useOutletContext();
  const [count, setCount] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState(state.provinces_id);
  const provinceQuery = ProvinceQuery();
  const districtQuery = DistrictQuery(selectedProvince);

  const onChangeAddress = (ev) => {
    dispatch({ type: ACTIONS.CHANGE_ADDRESS, next: ev.target.value });
  };

  const onClickNext = (ev) => {
    ev.preventDefault();

    if (state.address == "") {
      alert("adress must not be empty");
      return;
    }

    onSetActive(4);
    onSetAvailable(4);
  };

  const onClickPrevious = (ev) => {
    ev.preventDefault();
    onSetActive(2);
  };

  useEffect(() => {
    if (provinceQuery.isSuccess && state.provinces_id == 0) {
      setCount(1);
      dispatch({ type: ACTIONS.CHANGE_PROVINCES, next: provinceQuery.data[0].code });
    }

    if (districtQuery.isSuccess) {
      const arr = [];
      districtQuery.data.forEach((district) => arr.push(district.code));
      if (arr.includes(state.district_id)) {
        dispatch({ type: ACTIONS.CHANGE_DISTRICT, next: state.district_id });
      } else {
        dispatch({ type: ACTIONS.CHANGE_DISTRICT, next: districtQuery.data[0].code });
      }
    }
  }, [provinceQuery.status, districtQuery.status]);

  return (
    <StyledContainer>
      <StyledSecion1 style={{ backgroundImage: `url(${Img})` }}>
        <StyledImgOverlay />
        <StyleText>
          <h2>Add your location</h2>
        </StyleText>
      </StyledSecion1>
      <StyledSecion2>
        {provinceQuery.isLoading ? (
          <Loading />
        ) : (
          <StyledForm>
            <StyledBoderInput>
              <StyledTitle>Location</StyledTitle>
              <StyledInputContainer>
                <StyledCityDistrict>
                  <div>
                    <label>City</label>
                    <StyledSelect
                      value={state.provinces_id}
                      onChange={(ev) => {
                        dispatch({
                          type: ACTIONS.CHANGE_PROVINCES,
                          next: ev.target.value,
                        });
                        setSelectedProvince(ev.target.value);
                      }}
                    >
                      {provinceQuery.isSuccess &&
                        provinceQuery.data.map((province, index) => {
                          return (
                            <option key={index} value={province.code}>
                              {province.full_name}
                            </option>
                          );
                        })}
                    </StyledSelect>
                  </div>
                  <div>
                    <label>District</label>
                    <StyledSelect
                      onChange={(ev) => {
                        dispatch({ type: ACTIONS.CHANGE_DISTRICT, next: ev.target.value });
                      }}
                      value={state.district_id}
                    >
                      {districtQuery.isLoading && <option>Loading...</option>}
                      {districtQuery.isSuccess &&
                        districtQuery.data.map((district, index) => {
                          return (
                            <option key={index} value={district.code}>
                              {district.full_name}
                            </option>
                          );
                        })}
                    </StyledSelect>
                  </div>
                </StyledCityDistrict>
                <StyledAddress>
                  <label className="required">Address *</label>
                  <StyledInput
                    value={state.address}
                    onChange={(ev) => {
                      dispatch({ type: ACTIONS.CHANGE_ADDRESS, next: ev.target.value });
                    }}
                    disabled={districtQuery.isLoading}
                    type="text"
                  />
                </StyledAddress>
              </StyledInputContainer>
            </StyledBoderInput>

            <StyledGroupButon>
              <StyledLink onClick={onClickPrevious}>Back </StyledLink>
              <StyledLink disabled={districtQuery.isLoading} onClick={onClickNext}>
                Next
              </StyledLink>
            </StyledGroupButon>
          </StyledForm>
        )}
      </StyledSecion2>
    </StyledContainer>
  );
};

export default Location;
