import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateSuccessBookingMutation, UserReadSuccess } from "api/userBookingApi";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const ThankYouContainer = styled.div`
  text-align: center;
  line-height: 1.5;
  min-height: 700px;
  p {
    color: #717171;
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2em;
`;
const StyledIcon = styled.div`
  font-size: 15rem;
`;
const PaymentSuccess = () => {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const transactionID = searchParam.get("payment_intent");
  const booking_id = searchParam.get("booking_id");
  const booking_status = searchParam.get("booking_status");
  const amount = searchParam.get("amount");
  const formData = new FormData();
  const createSuccessBookingMutation = CreateSuccessBookingMutation();
  useEffect(() => {
    formData.append("payment_intent", transactionID);
    formData.append("booking_id", booking_id);
    formData.append("booking_status", booking_status);
    formData.append("amount", amount);

    createSuccessBookingMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["booking", booking_id] });
      },
      // onError: (error) => {
      //   const response = error.response;
      //   if (response.status === 403) {
      //     alert("Booking fail");
      //   }
      // },
    });
  }, [transactionID]);

  const readSuccess = UserReadSuccess(transactionID);
  if (readSuccess.isLoading) {
    <Loading />;
  }
  if (readSuccess.isError) {
    <p></p>;
  }
  return (
    <div>
      {readSuccess.isSuccess && (
        <ThankYouContainer>
          <Description>
            <StyledIcon>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#06e50a" }} />
            </StyledIcon>
            {/* <Title>Thank You!</Title> */}
            <p>Your payment was successful</p>
            <div>Thank you for your payment</div>
          </Description>
        </ThankYouContainer>
      )}
    </div>
  );
};

export default PaymentSuccess;
