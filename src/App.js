import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

import { loadStripe } from "@stripe/stripe-js";

import "./App.css";
import RefundForm from "./Refund";
import SubscriptionForm from "./Subscription";
import ChartComponent from "./chart";
import LineChart from "./chart";

const stripePromise = loadStripe(
  "pk_test_51NuodbL0e1o7y1uzBe3Uv67SCzMkRUv7S4MLvL0UHirXXYGHbzjiktSAngZYpz6cCYRlkUeBI3O0iAW6UqFDBibd00JOPpEtGc"
);

const initialDisplayState = {
  newTransaction: false,
  refund: false,
  subscription: false,
};

function App() {
  const [displayState, setDisplayState] = useState(initialDisplayState);

  return (
    <div className="App">
      <h1>Stripe Payment Example</h1>
      <div className="payment_buttons">
        <button
          className="payment_buttons-button"
          onClick={(e) => {
            e.preventDefault();
            setDisplayState({
              ...initialDisplayState,
              newTransaction: true,
            });
          }}
        >
          Create a new transaction
        </button>
        <button
          className="payment_buttons-button"
          onClick={(e) => {
            e.preventDefault();
            setDisplayState({
              ...initialDisplayState,
              refund: true,
            });
          }}
        >
          Refund a transaction
        </button>
        <button
          className="payment_buttons-button"
          onClick={(e) => {
            e.preventDefault();
            setDisplayState({
              ...initialDisplayState,
              subscription: true,
            });
          }}
        >
          Create Subscription
        </button>
      </div>
      <Elements stripe={stripePromise}>
        {displayState.newTransaction && <PaymentForm />}
        {displayState.refund && <RefundForm />}
        {displayState.subscription && <SubscriptionForm />}
      </Elements>

      <LineChart />
    </div>
  );
}

export default App;
