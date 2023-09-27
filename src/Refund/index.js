import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const initialRefundState = {
  chargeId: "",
  amount: 0,
};

function RefundForm() {
  const [refundState, setRefundState] = useState(initialRefundState);

  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      // Stripe.js has not yet loaded.
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/stripe/refund", {
        chargeId: refundState.chargeId,
        amount: refundState.amount,
      });

      console.log(response.data);
      setRefundState(initialRefundState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Charge ID:
        <input
          type="text"
          value={refundState.chargeId}
          onChange={(e) =>
            setRefundState((state) => ({ ...state, chargeId: e.target.value }))
          }
        />
      </label>
      <br />

      <label>
        Amount:
        <input
          type="number"
          value={refundState.amount}
          onChange={(e) =>
            setRefundState((state) => ({ ...state, amount: e.target.value }))
          }
        />
      </label>
      <br />

      <button type="submit">Refund</button>
    </form>
  );
}

export default RefundForm;
