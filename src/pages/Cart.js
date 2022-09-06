import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import Checkout from "../components/Checkout";

const Cart = () => {
  const [checkout, setCheckout] = useState(false);
  const { isEmpty, items, cartTotal, removeItem } = useCart();
  if (isEmpty) return <h1>Empty</h1>;
  if (items) console.log(items);
  const token = localStorage.getItem("token");

  if (checkout) {
    return (
      <div className="container">
        <Card>
          <CardContent>
            <h4>Payment method</h4>
            <Checkout /> <br />
            <button className="btn red" onClick={() => setCheckout(false)}>
              Cancel
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="container row">
        <ul className="collection col m8">
          {items.map((item) => (
            <li className="collection-item avatar">
              <img src={item.img} alt={item.name} className="circle" />
              <span className="title truncate">{item.name}</span>
              <p className="green-text">
                Price- ${item.price} x {item.quantity} = ${item.itemTotal}
              </p>

              <i
                className="secondary-content material-icons red-text"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  removeItem(item.id);
                }}
              >
                remove_circle
              </i>
            </li>
          ))}
        </ul>
        <div
          className="col m3 offset-m1"
          style={{ position: "sticky", top: "2px" }}
        >
          <h4>Total cart:</h4>
          <h4>${cartTotal}</h4>
          {token ? (
            <button className="btn blue" onClick={() => setCheckout(true)}>
              Checkout
            </button>
          ) : (
            <div className="card-panel red white-text">
              {" "}
              Please Login to checkout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
