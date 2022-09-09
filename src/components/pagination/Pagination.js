import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gotoNextPage,
  gotoPrevPage,
  changePage,
} from "../../features/filter/filterSlice";

const Pagination = () => {
  const { total, allTransactions } = useSelector(
    (state) => state.allTransaction
  );
  const [start, setStart] = useState(0);
  const dispatch = useDispatch();
  const {
    pagination: { currentPage, limit },
  } = useSelector((state) => state.filter);

  const pages = Math.ceil(total / limit);

  const loadedPages = pages > 5 ? 5 : pages;
  const paginationGroup = new Array(loadedPages)
    .fill()
    .map((_, index) => start + index + 1);

  const handlePrevClick = () => {
    if (paginationGroup[0] !== 1) {
      setStart((prev) => prev - 1);
    }
    dispatch(gotoPrevPage());
  };
  const handleNextClick = () => {
    if (paginationGroup[paginationGroup.length - 1] < pages) {
      setStart((prev) => prev + 1);
    }
    dispatch(gotoNextPage());
  };

  const handleChangePage = (p) => {
    dispatch(changePage(p));
  };

  console.log(paginationGroup, currentPage, pages);

  return (
    <section
      className={
        allTransactions.length > 0 ? "pagination-section" : "pagination-hidden"
      }
    >
      <div className='pagination-container'>
        <button
          className={
            currentPage === 1 ? "pagination-hidden" : "pagination-button"
          }
          onClick={handlePrevClick}
        >
          prev
        </button>
        {paginationGroup.map((p, index) => (
          <button
            className={
              currentPage === p
                ? "pagination-button-active"
                : "pagination-button"
            }
            key={index}
            onClick={() => handleChangePage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className={
            currentPage !== pages ? "pagination-button" : "pagination-hidden"
          }
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
