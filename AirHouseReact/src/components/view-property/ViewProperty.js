import React, { useEffect } from "react";
import styled from "styled-components";
import NavViewhost from "./NavViewhost";
import Images from "./Images";
import Information from "./Information";
import TotalBeforeTaxes from "./TotalBeforeTaxes";
import { useSearchParams } from "react-router-dom";
import { PropertyQueryId } from "api/propertyApi";
import Loading from "components/Loading";
import PropertyNotFound from "components/PropertyNotFound";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReadAverageStart, ReadStartAll } from "api/startApi";
import Avatar from "react-avatar";
import RatingStart from "./RatingStart";
import { useQueryClient } from "@tanstack/react-query";

const StyledContainer = styled.div`
  max-width: 1150px;
  padding: 0 1rem;
  margin: auto;
`;
const StyledInformation = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;

    > div:nth-of-type(1) {
    }

    > div:nth-of-type(2) {
      grid-row: 1/1;
    }
  }

  @media (max-width: 692px) {
    grid-template-columns: repeat(1, 1fr);

    > div:nth-of-type(1) {
      margin: auto;
    }
  }
`;
const StyledContainerReview = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  border-top: 1px solid #dddddd;
`;
const StyledContainerAll = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 2rem;
  margin-top: 1rem;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const StyledName = styled.span`
  font-weight: 500;
  font-size: 18px;
  padding-left: 10px;
`;
const StyledStart = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 10px;
  font-size: 12px;
  column-gap: 0.5rem;
`;
const StyledMessage = styled.div`
  color: #717171;
  min-height: 4rem;
  text-indent: 30px;
  font-size: 14px;
`;
const StyledText = styled.div`
  text-align: center;
  line-height: 1.5;
`;
const StyledImage = styled.img`
  width: 8rem;
`;
const StyledRating = styled.div`
  text-align: center;
`;
const StyledSeeMore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledButtonSeeMore = styled.button`
  background-color: white;
  margin: 0.5rem 0;
  border: none;
  font-size: 14px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
    border-radius: 3px;
  }
`;
const formatDate = (dateObj) => {
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
};

const listDate = (start, end) => {
  const allDatesInRange = [];

  const current = new Date(start);
  const endDate = new Date(end);

  while (formatDate(current) <= formatDate(endDate)) {
    allDatesInRange.push(formatDate(current));

    current.setDate(current.getDate() + 1);
  }

  return allDatesInRange;
};

const ViewProperty = () => {
  const [serachParam, setserachParam] = useSearchParams();
  const [page, setPage] = useState(1);
  //Cac queries
  const propertyQuery = PropertyQueryId(serachParam.get("id"));
  const readAverageStart = ReadAverageStart(serachParam.get("id"));
  const readAllStart = ReadStartAll(serachParam.get("id"), page);
  //
  const property_id = serachParam.get("id");
  const [showSee, setShowSee] = useState(true);
  const [showSeeTotal, setShowSeeTotal] = useState(false);
  const [value, setValue] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (readAllStart.isSuccess && readAllStart.data.total < 4) {
      setShowSee(false);
      setShowSeeTotal(false);
    } else {
      setShowSeeTotal(true);
    }
  }, [readAllStart.status]);

  if (propertyQuery.isLoading || readAverageStart.isLoading || readAllStart.isLoading) {
    return <Loading />;
  }

  if (propertyQuery.isError) {
    return <PropertyNotFound />;
  }

  const handleClickSeeMore = () => {
    const currentpage = page + 1;
    setPage(currentpage);
    if (page === Math.ceil(readAllStart.data.total / 4) - 1) {
      setShowSee(false);
    }
  };
  console.log(readAllStart.data.total);
  const handleClickHide = () => {
    setPage(1);
    setShowSee(true);
  };

  const bookedDate = [];

  for (let i = 0; i < propertyQuery.data.booking.length; i++) {
    if (propertyQuery.data.booking[i].booking_status === "success") {
      bookedDate.push({
        start: propertyQuery.data.booking[i].check_in_date,
        end: propertyQuery.data.booking[i].check_out_date,
      });
    }
  }

  for (let i = 0; i < propertyQuery.data.exception_date.length; i++) {
    bookedDate.push({
      start: propertyQuery.data.exception_date[i].start_date,
      end: propertyQuery.data.exception_date[i].end_date,
    });
  }

  let arrBookedDate = [];
  for (let i = 0; i < bookedDate.length; i++) {
    arrBookedDate = [...arrBookedDate, ...listDate(bookedDate[i].start, bookedDate[i].end)];
  }

  const disabledBookDate = ({ activeStartDate, date, view }) => {
    const isDisabled = arrBookedDate.some((bookedDate) => {
      return bookedDate === formatDate(new Date(date));
    });

    return isDisabled;
  };

  const onHandleChange = (date) => {
    let selectedArr = [];

    if (date[1] == null) {
      selectedArr = [...listDate(formatDate(new Date(date[0])), formatDate(new Date(date[0])))];
    } else {
      selectedArr = [...listDate(formatDate(new Date(date[0])), formatDate(new Date(date[1])))];

      if (selectedArr.length < propertyQuery.data.minimum_stay || selectedArr.length > propertyQuery.data.maximum_stay) {
        alert("Range booke date from " + propertyQuery.data.minimum_stay + " to " + propertyQuery.data.maximum_stay);
        setValue([null, null]);
        return;
      }
    }

    let isWrong = false;

    selectedArr.forEach((selectedDate) => {
      if (arrBookedDate.includes(selectedDate)) {
        isWrong = true;
        return;
      }
    });

    if (isWrong) {
      setValue(value);
    } else {
      setValue(date);
    }
  };

  return (
    <div>
      <div>
        <StyledContainer>
          <NavViewhost data={propertyQuery.data} />
          <Images data={propertyQuery.data} />
          <StyledInformation>
            <Information
              disabledBookDate={disabledBookDate}
              value={value}
              setValue={setValue}
              onHandleChange={onHandleChange}
              data={propertyQuery.data}
            />
            <TotalBeforeTaxes
              className="totalbefore"
              disabledBookDate={disabledBookDate}
              value={value}
              setValue={setValue}
              onHandleChange={onHandleChange}
              data={propertyQuery.data}
            />
          </StyledInformation>
          {readAverageStart.isSuccess && (
            <StyledContainerReview>
              <StyledImage src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg" alt="" />
              <StyledText>
                <div>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#ffcc00" }} />
                </div>
                <div>
                  <div> {readAverageStart.data.average}</div>
                </div>
              </StyledText>
              <StyledImage src="	https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg" alt="" />
            </StyledContainerReview>
          )}
          <StyledRating>
            <RatingStart property_id={property_id} page={page} />
          </StyledRating>
          <StyledContainerAll>
            {readAllStart.isSuccess &&
              readAllStart.data.ratings.data.map((item) => (
                <div>
                  <Avatar src={item.user.image} size="40px" textSizeRatio={2} round={true} name={item.user.first_name} />
                  <StyledName>
                    {item.user.first_name} {item.user.last_name}
                  </StyledName>
                  <StyledStart>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          style={{
                            color: index < item.start ? "#ffcc00" : "#c0c0c0",
                          }}
                        />
                      ))}
                    </div>
                    <div> {formatDate(new Date(item.updated_at))}</div>
                  </StyledStart>
                  <StyledMessage>{item.message}</StyledMessage>
                </div>
              ))}
          </StyledContainerAll>
          {readAverageStart.isSuccess && (
            <StyledSeeMore>
              {showSee ? (
                <StyledButtonSeeMore onClick={handleClickSeeMore}>{">>"} See more</StyledButtonSeeMore>
              ) : (
                <div>{showSeeTotal ? <StyledButtonSeeMore onClick={handleClickHide}>{"<<"} Hide</StyledButtonSeeMore> : null}</div>
              )}
            </StyledSeeMore>
          )}
        </StyledContainer>
      </div>
    </div>
  );
};

export default ViewProperty;
