import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../features/AllTransaction/transactionListSlice";
import TransactionList from "../components/TransactionList";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterType from "../components/FilterType";
import { clearFilter } from "../features/filter/filterSlice";
import Pagination from "../components/pagination/Pagination";

const AllTransaction = () => {
  const { allTransactions, isLoading, isError, error } = useSelector(
    (state) => state.allTransaction
  );
  const {
    search,
    type,
    pagination: { currentPage, limit },
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions({ search, type, currentPage, limit }));
  }, [dispatch, search, type, currentPage, limit]);

  const handleReset = () => {
    dispatch(clearFilter());
  };

  // decide what to render
  let content;

  if (isLoading) content = <li className='transaction'>Loading...</li>;
  if (!isLoading && isError) content = <li className='transaction'>{error}</li>;
  if (!isLoading && !isError && allTransactions?.length === 0) {
    content = <li className='transaction'>No data found!!!</li>;
  }
  if (!isLoading && !isError && allTransactions?.length > 0) {
    content = allTransactions.map((transaction) => (
      <TransactionList key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <div className='allTrasaction-container'>
      <button className='homeButton' onClick={handleReset}>
        <Link to='/'>Go Home</Link>
      </button>
      <button className='clearButton' onClick={handleReset}>
        Reset
      </button>
      <div className='search-filter'>
        <SearchBar />
        <FilterType />
      </div>
      <h2 className='allTransaction-heading'>Your Transaction List :</h2>
      <ul>{content}</ul>

      <Pagination />
    </div>
  );
};

export default AllTransaction;
