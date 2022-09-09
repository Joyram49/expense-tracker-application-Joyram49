import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched, resetCurrentPage } from "../features/filter/filterSlice";

const SearchBar = () => {
  const { search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [input, setInput] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(input));
    dispatch(resetCurrentPage());
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className='searchBar'
        type='search'
        name='search'
        placeholder='Search'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
