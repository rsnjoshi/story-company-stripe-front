import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const initialSubscriptionState = {
  customerId: "",
  planId: "",
};

function SubscriptionForm() {
  const [subscriptionState, setSubscriptionState] = useState(
    initialSubscriptionState
  );

  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      // Stripe.js has not yet loaded.
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/stripe/createSubscription",
        {
          customerId: subscriptionState.customerId,
          planId: subscriptionState.planId,
        }
      );

      console.log(response.data);
      setSubscriptionState(initialSubscriptionState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Customer ID:
        <input
          type="text"
          value={subscriptionState.customerId}
          onChange={(e) =>
            setSubscriptionState((state) => ({
              ...state,
              customerId: e.target.value,
            }))
          }
        />
      </label>
      <br />

      <label>
        Plan ID:
        <input
          type="text"
          value={subscriptionState.planId}
          onChange={(e) =>
            setSubscriptionState((state) => ({
              ...state,
              planId: e.target.value,
            }))
          }
        />
      </label>
      <br />

      <button type="submit">Subscribe</button>
    </form>
  );
}

export default SubscriptionForm;
