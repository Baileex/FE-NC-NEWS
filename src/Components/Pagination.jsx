import React from "react";

const Pagination = (props) => {
    const { changePage, page, maxPages } = props;
    return (
      <div className="button-group">
        <span>
          <button
            className="w3-button w3-light-grey w3-section"
            onClick={() => changePage(-1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="w3-button w3-light-grey w3-section"
            onClick={() => changePage(1)}
            disabled={page === maxPages}
          >
            Next
          </button>
        </span>
      </div>
    );
  }

export default Pagination;
