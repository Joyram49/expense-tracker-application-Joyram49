import React, { useState } from "react";
import EditImg from "../assets/edit.svg";
import DeleteImg from "../assets/delete.svg";
import { useDispatch } from "react-redux";
import {
  removeAllTransaction,
  updateActive,
} from "../features/AllTransaction/transactionListSlice";
import Modal from "./Modal";

const TransactionList = ({ transaction }) => {
  const { amount, name, id, type } = transaction;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setShowModal(true);
    dispatch(updateActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeAllTransaction(id));
  };
  return (
    <div className='transactionList-container'>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className='right'>
          <p>৳ {amount}</p>
          <button className='link' onClick={handleUpdate}>
            <img className='icon' src={EditImg} alt='edit img' />
          </button>
          <button className='link' onClick={handleDelete}>
            <img className='icon' src={DeleteImg} alt='delete img' />
          </button>
        </div>
        {showModal && <Modal />}
      </li>
    </div>
  );
};

export default TransactionList;
