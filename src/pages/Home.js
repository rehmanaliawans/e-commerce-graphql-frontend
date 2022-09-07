import { useQuery } from "@apollo/client";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiCard from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { GET__ALL_PRODUCTS } from "../gqlOperations/queries";

const Home = () => {
  const [page, setPage] = useState();
  const { data, error, loading, refetch } = useQuery(GET__ALL_PRODUCTS, {
    variables: {
      pagination: {
        page: page,
        pageSize: 3,
      },
    },
  });
  useEffect(() => {
    if (page != 1) refetch();
  }, [page]);

  const updatePage = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className="container">
        <SearchBar />
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
        <Pagination
          pageCount={data?.products?.meta?.pagination?.pageCount}
          updatePage={updatePage}
        />
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
