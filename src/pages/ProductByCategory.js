import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import MuiCard from "../components/Card";
import { GET_CATEGORY_BY_ID } from "../gqlOperations/queries";

const ProductByCategory = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_CATEGORY_BY_ID, {
    variables: {
      categoryId: id,
    },
  });
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
    <div className="container">
      {" "}
      <div className="homeroot">
        {data?.category?.data?.attributes?.products?.data.length > 0 ? (
          data?.category?.data?.attributes?.products?.data?.map(
            ({ id, attributes }) => {
              return (
                <MuiCard
                  key={id}
                  id={id}
                  description={attributes.description}
                  name={attributes.name}
                  price={attributes.price}
                  img={attributes.images.data[0].attributes.url}
                />
              );
            },
          )
        ) : (
          <div className="card-panel">
            <h4> No Item Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductByCategory;
