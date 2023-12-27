import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;
const stripePromise = loadStripe(
  "pk_test_51OMEQvCQa88qCWLBVl5p1ctSKLQSkvWoecYTM4fcDS4A0ZbdfB8T1U44HBhhc5n52qLCGHBSroCKW3yjp3xGbiIh00NDBpcWZJ"
);
const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",

  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};
const PaymentForm = ({ data }) => {
  return (
    <div>
      <Title>Secure Payment</Title>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm data={data} />
      </Elements>
    </div>
  );
};
export default PaymentForm;
