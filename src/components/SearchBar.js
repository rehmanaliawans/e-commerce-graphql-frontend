import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_PRODUCT_BY_NAME } from "../gqlOperations/queries";

const SearchBar = () => {
  const [nameQuery, setNameQuery] = useState("");
  const [hideResult, setHideResult] = useState(true);
  const [getProduct, { loading, data, error }] = useLazyQuery(
    GET_PRODUCT_BY_NAME,
    {
      variables: {
        filters: {
          name: {
            startsWith: nameQuery,
          },
        },
      },
    },
  );
  useEffect(() => {
    if (nameQuery.length != 0) {
      getProduct();
      setHideResult(false);
    } else {
      setHideResult(true);
    }
  }, [nameQuery]);
  const handleChange = (e) => {
    setTimeout(() => {
      setNameQuery(e.target.value);
    }, 1000);
  };
  return (
    <div>
      <div className="input-field">
        <input type="search" required onChange={handleChange} />
        <label className="label-icon">
          <i className="material-icons">search</i>
        </label>
        <i
          className="material-icons"
          onClick={() => {
            setHideResult(true);
            setNameQuery("");
          }}
        >
          close
        </i>
      </div>
      <div className="showSuggestions" hidden={hideResult}>
        {data &&
          data.products.data.map(({ id, attributes }) => {
            return (
              <Link to={`/product/${id}`} key={id}>
                <h6
                  style={{ padding: "10px", cursor: "pointer" }}
                  className="blue white-text"
                >
                  {attributes.name}
                </h6>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBar;
