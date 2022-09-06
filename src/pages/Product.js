import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqlOperations/queries";
import Carousel from "@brainhubeu/react-carousel";
import { BACKEND_URL } from "../utils/const";
import { useCart } from "react-use-cart";

const Product = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: id,
    },
  });
  if (data) {
    console.log("id", data);
  }
  const { name, images, description, price } =
    data?.product?.data?.attributes || {};

  const addToCartMethod = () => {
    addItem({
      id,
      name,
      price,
      img: BACKEND_URL + images.data[0].attributes.url,
    });
  };
  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <div>
      <div className="container">
        <Carousel plugins={["arrows"]}>
          {images?.data.map(({ attributes }, index) => {
            return (
              <img
                key={index}
                style={{ height: "50vh" }}
                src={BACKEND_URL + attributes.url}
                alt="as"
              />
            );
          })}
        </Carousel>
        <div>
          <h3>{name}</h3>
          <h5 className="green-text">$ {price}</h5>
          <p>{description}</p>
          <button className="btn blue" onClick={addToCartMethod}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
