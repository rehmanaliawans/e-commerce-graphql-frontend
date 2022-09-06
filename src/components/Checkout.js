import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../utils/const";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const [formData, setFormData] = useState({});
  const [payButton, setPayButton] = useState(true);
  const [payProcessing, setPayProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const requestForPayment = async (allFormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(allFormData),
      });
      return await res.json();
    } catch (err) {
      console.log("err call");
      console.log("error", err);
      alert("Payment failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items,
    };
    console.log("final data", allFormData);
    setPayProcessing(true);
    await requestForPayment(allFormData);
    setPayProcessing(false);
    emptyCart();
  };
  if (payProcessing) return <h1>Loading</h1>;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="shippingAddress"
        required
        placeholder="shipping address"
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        required
        placeholder="city"
        onChange={handleChange}
      />
      <input
        type="text"
        name="state"
        required
        placeholder="state"
        onChange={handleChange}
      />
      <input
        type="number"
        name="pin"
        required
        placeholder="pin code"
        onChange={handleChange}
      />
      <CardElement
        onChange={(e) => {
          if (e.complete) {
            setPayButton(false);
          } else {
            setPayButton(true);
          }
        }}
      />
      <br />
      <button
        className="btn blue"
        type="submit"
        disabled={!stripe || !elements || payButton}
      >
        Pay
      </button>
    </form>
  );
};
const stripePromise = loadStripe(
  "pk_test_51JmfB5GCtzhgFiZ2ICvec129Jq99t9EVf23EmUPZBPMNFogNYZPK15VVo4xFqWSUcdRtgArS0s7DA6lgKyBEaANU00IM93TJqG",
);

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
