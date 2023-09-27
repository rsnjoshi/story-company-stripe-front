import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// const stripePromise = loadStripe("pk_test_...");

function PaymentForm() {
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const result = await stripe.createToken(elements.getElement(CardElement));

    if (result.error) {
      console.error(result.error.message);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/stripe/createPayment",
          {
            amount: amount * 100,
            currency: "USD",
            token: result.token.id,
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount (in USD):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
}

export default PaymentForm;
