import React from "react";

const Pagination = ({ pageCount, updatePage }) => {
  console.log("pageCount", pageCount);
  return (
    <div className="pages">
      {[...Array(pageCount).keys()].map((value) => {
        return (
          <button
            key={value}
            className="btn chip"
            onClick={() => updatePage(value + 1)}
          >
            {value + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
