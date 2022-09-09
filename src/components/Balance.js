import React from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateIncome = (transactions) => {
    let total = 0;
    transactions.map((transaction) => {
      const { amount, type } = transaction;
      if (type === "income") {
        total += amount;
      } else {
        total -= amount;
      }
      return total;
    });
    return total;
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      className={
        calculateIncome(transactions) > 0 ? "top_card" : "top_card red"
      }
    >
      <p>
        {calculateIncome(transactions) > 0
          ? "Your Current Balance"
          : "Your current debt"}
      </p>
      <h3>
        <span>৳</span>
        <span>{numberWithCommas(Math.abs(calculateIncome(transactions)))}</span>
      </h3>
    </div>
  );
};

export default Balance;
