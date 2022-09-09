import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateInactive,
  updateTransaction,
} from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const { currentTransaction } =
    useSelector((state) => state.transaction) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const { id, name, type, amount } = currentTransaction || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [currentTransaction]);

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { id } = currentTransaction;
    dispatch(
      updateTransaction({
        id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    setEditMode(false);
    reset();
  };

  const cancelUpdate = () => {
    reset();
    dispatch(updateInactive());
    setEditMode(false);
  };

  return (
    <div className='form'>
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className='form-group'>
          <label>Name</label>
          <input
            required
            type='text'
            name='name'
            value={name}
            placeholder='Enter title'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group radio'>
          <label>Type</label>
          <div className='radio_group'>
            <input
              required
              type='radio'
              value='income'
              name='type'
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className='radio_group'>
            <input
              required
              type='radio'
              value='expense'
              name='type'
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className='form-group'>
          <label>Amount</label>
          <input
            required
            type='number'
            placeholder='Enter Amount'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className='btn' type='submit' disabled={isLoading && isError}>
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      {editMode && (
        <button className='btn cancel_edit' onClick={cancelUpdate}>
          Cancel Edit
        </button>
      )}
      {isError && <p className='error'>{error}</p>}
    </div>
  );
};

export default Form;
