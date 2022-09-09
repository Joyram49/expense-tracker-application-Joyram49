import React from "react";
import EditImg from "../../assets/edit.svg";
import DeleteImg from "../../assets/delete.svg";
import {
  removeTransaction,
  updateActive,
} from "../../features/transaction/transactionSlice";
import { useDispatch } from "react-redux";

const TransactionItem = ({ transaction }) => {
  const { amount, type, name, id } = transaction;
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className='right'>
        <p>{amount}</p>
        <button className='link' onClick={handleUpdate}>
          <img className='icon' src={EditImg} alt='editImg' />
        </button>
        <button className='link' onClick={handleDelete}>
          <img className='icon' src={DeleteImg} alt='deleteImg' />
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
