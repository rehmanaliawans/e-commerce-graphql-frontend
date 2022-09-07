import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_CATEGORIES } from "../gqlOperations/queries";

const Category = () => {
  const { loading, data, error } = useQuery(GET_ALL_CATEGORIES);
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
    <div className="category">
      {data.categories.data.map(({ id, attributes }) => {
        return (
          <Link to={`/category/${id}`}>
            <h5 className="chip btn " style={{ cursor: "pointer" }}>
              {attributes.name}{" "}
            </h5>
          </Link>
        );
      })}
      <Link to="/">
        <h5 className="chip btn " style={{ cursor: "pointer" }}>
          All
        </h5>
      </Link>
    </div>
  );
};

export default Category;
