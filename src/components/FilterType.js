import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, resetCurrentPage } from "../features/filter/filterSlice";

const FilterType = () => {
  const { type } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [typeLocal, setTypeLocal] = useState(type);

  useEffect(() => {
    setTypeLocal(type);
    dispatch(resetCurrentPage());
  }, [dispatch, type]);

  return (
    <div className='form-group radio'>
      <label>Transaction Type :</label>
      <div className='radio_group'>
        <input
          required
          type='radio'
          value='income'
          name='type'
          checked={typeLocal === "income"}
          onChange={(e) => dispatch(filterByType(e.target.value))}
        />
        <label>Income</label>
      </div>
      <div className='radio_group'>
        <input
          required
          type='radio'
          value='expense'
          name='type'
          checked={typeLocal === "expense"}
          onChange={(e) => dispatch(filterByType(e.target.value))}
        />
        <label>Expense</label>
      </div>
    </div>
  );
};

export default FilterType;
