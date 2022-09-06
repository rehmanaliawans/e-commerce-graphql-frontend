import { useQuery } from "@apollo/client";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";
import MuiCard from "../components/Card";
import { GET__ALL_PRODUCTS } from "../gqlOperations/queries";

const Home = () => {
  const { data, error, loading } = useQuery(GET__ALL_PRODUCTS);

  console.log("call");
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <div className="homeroot">
        {data?.products?.data?.map(({ id, attributes }) => {
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
        })}
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

export default Home;
