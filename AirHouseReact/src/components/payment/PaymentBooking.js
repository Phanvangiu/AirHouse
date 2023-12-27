import { UserReadBooking } from "api/userBookingApi";
import Loading from "components/Loading";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PaymentForm from "./PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import BookingNotFound from "./BookingNotFound";
import PaymentNotFound from "./PaymentNotFound";
import Avatar from "react-avatar";

const PaymentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 900px;
  margin: 0 auto;
  gap: 5rem;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
`;
const StyledContainer = styled.div``;
const StyledNameProperty = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  column-gap: 1rem;
`;
const StyledCheckBlock = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px #dddddd solid;
`;
const StyledGuestBlock = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px #dddddd solid;
`;
const StyledFixedBlock = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px #dddddd solid;
`;
const StyledCheck = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
  line-height: 1.7;
  align-items: center;
  span {
    color: #717171;
    font-size: 0.9rem;
  }
`;
const StyledPropertyName = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
  align-items: center;
  line-height: 1.7;
  span {
    color: #717171;
    font-size: 0.9rem;
  }
`;
const StyledRefund = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
  align-items: center;
  line-height: 1.7;
  span {
    color: #717171;
  }
  div {
    font-size: 1.3rem;
  }
`;
const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
const PaymentBooking = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryBooking = UserReadBooking(searchParam.get("booking_id"));
  if (queryBooking.isLoading) {
    return <Loading />;
  }
  //đoạn này
  //
  //
  //
  if (queryBooking.isError) {
    if (queryBooking.error.response.data.status === 403) {
      return <BookingNotFound />;
    } else if (queryBooking.error.response.data.status === 404) {
      return <PaymentNotFound />;
    }
  }
  // console.log("abc", queryBooking.error.response.data.status);
  //đây
  //
  //
  //
  const data = queryBooking.data;
  return (
    <div>
      <div>
        {queryBooking.isSuccess && (
          <PaymentContainer>
            <StyledContainer>
              <StyledNameProperty>
                <Avatar src={data.hostName.image} size="40px" textSizeRatio={2} round={true} name={data.hostName.first_name} />
                <div>{data.booking.property.name}</div>
              </StyledNameProperty>
              <StyledCheckBlock>
                <StyledCheck>
                  <div>Check in day: </div>
                  <span>{formatCreatedAt(data.booking.check_in_date)}, after 02:00 PM</span>
                </StyledCheck>
                <StyledCheck>
                  <div>Check out day:</div>
                  <span>{formatCreatedAt(data.booking.check_out_date)}, before: 12:00 PM</span>
                </StyledCheck>
              </StyledCheckBlock>
              <StyledGuestBlock>
                <StyledPropertyName>
                  <div>Property type:</div>
                  <span>{data.propertyType}</span>
                </StyledPropertyName>
                <StyledPropertyName>
                  <div>Host Name:</div>
                  <span>
                    {data.hostName.first_name}
                    <span> {data.hostName.last_name}</span>
                  </span>
                </StyledPropertyName>
                <StyledPropertyName>
                  <div>Guest Name:</div>
                  <span>
                    {data.renter.first_name}
                    <span> {data.renter.last_name}</span>
                  </span>
                </StyledPropertyName>
                <StyledPropertyName>
                  <div>Total guest:</div>
                  <span>{data.booking.total_person}</span>
                </StyledPropertyName>
              </StyledGuestBlock>
              <StyledFixedBlock>
                <StyledRefund>
                  <div>
                    <FontAwesomeIcon icon={faCalendarXmark} />
                  </div>
                  <span>Không đổi lịch</span>
                </StyledRefund>
                <StyledRefund>
                  <div>
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <span>Không hoàn tiền</span>
                </StyledRefund>
              </StyledFixedBlock>
            </StyledContainer>
            <div>
              <PaymentForm data={data} />
            </div>
          </PaymentContainer>
        )}
      </div>
    </div>
  );
};

// Component mới để hiển thị form thanh toán

export default PaymentBooking;
