import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // decide what to render
  let content;

  if (isLoading) content = <li className='transaction'>Loading...</li>;
  if (!isLoading && isError) content = <li className='transaction'>{error}</li>;
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <li className='transaction'>No data found!!!</li>;
  }
  if (
    !isLoading &&
    !isError &&
    transactions?.length > 0 &&
    transactions?.length <= 5
  ) {
    content = transactions.map((transaction) => (
      <TransactionItem key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions?.length > 5) {
    let limitTransactions = transactions.slice(0, 5);
    content = limitTransactions.map((transaction) => (
      <TransactionItem key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <>
      <div className='conatiner_of_list_of_transactions'>
        <ul>{content}</ul>
      </div>
      {transactions.length > 5 && (
        <button className='viewButton'>
          <Link to='/alltransaction'>View All</Link>
        </button>
      )}
    </>
  );
};

export default Transactions;
