import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqlOperations/queries";
import Carousel from "@brainhubeu/react-carousel";
import { BACKEND_URL } from "../utils/const";
const Product = () => {
  const { id } = useParams();
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
  return (
    <div>
      <div className="container">
        <Carousel plugins={["arrows"]}>
          {images?.data?.map(({ attributes }) => {
            return (
              <img
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
          <button className="btn blue">Add to Cart</button>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Product;
