import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import axiosClient from "api/axiosClient";
import { useNavigate } from "react-router-dom";
const StyledButton = styled.button`
  margin-top: 1rem;
  border: none;
  padding: 0.4rem 2rem;
  font-weight: 600;
  &:focus {
    background-color: #db0c63;
    color: white;
  }
  &:hover {
    background-color: #db0c63;
    color: white;
  }
`;
const StyledMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 12px;
  color: red;
`;
export default function CheckoutForm({ data }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const amount = data.booking.price_for_stay + data.booking.site_fees;
  const booking_id = data.booking.id;
  const booking_status = data.booking.booking_status;

  // Hàm gọi API để nhận clientSecret từ máy chủ
  const getClientSecret = async (amount, booking_id) => {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("booking_id", booking_id);
    const response = await axiosClient.post("http://127.0.0.1:8000/api/create-payment-intent", formData);

    const data = await response.data;
    return data.clientSecret;
  };

  // Sử dụng clientSecret để gọi stripe.confirmPayment(). Nếu thành công, hiển thị ID của thanh toán.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded.");
      return;
    }
    console.log("Stripe or Elements loaded.");
    setIsProcessing(true);

    // Gọi hàm getClientSecret để nhận clientSecret

    const clientSecret = await getClientSecret(amount, booking_id);
    //cần submit để confirm
    elements.submit();
    // Sử dụng clientSecret để gọi stripe.confirmPayment()
    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        clientSecret: clientSecret,
        elements,
        confirmParams: {
          return_url:
            "http://localhost:3000/user/sucsessPayment?booking_id=" +
            booking_id +
            "&booking_status=" +
            booking_status +
            "&amount=" +
            amount,
        },
      });
    } catch (error) {
      //dong nay
      alert("Someone hired on the day you choose. Booking again please");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <StyledButton disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
      </StyledButton>
      {message && <StyledMessage id="payment-message">{message}</StyledMessage>}
    </form>
  );
}
