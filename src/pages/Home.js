import React from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/transactions/Transactions";

const Home = () => {
  return (
    <>
      <Balance />
      <Form />
      <p className='second_heading'>Your Transactions:</p>
      <Transactions />
    </>
  );
};

export default Home;
