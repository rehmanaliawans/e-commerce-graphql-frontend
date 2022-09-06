import { useQuery } from "@apollo/client";
import React from "react";
import { GET__ALL_PRODUCTS } from "../gqlOperations/queries";

const Home = () => {
  const { data, error, loading } = useQuery(GET__ALL_PRODUCTS);

  return <div>Home</div>;
};

export default Home;
