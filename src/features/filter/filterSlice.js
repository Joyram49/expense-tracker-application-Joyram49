import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState = {
  type: "",
  search: "",
  pagination: {
    currentPage: 1,
    limit: 5,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.search = action.payload;
    },
    filterByType: (state, action) => {
      state.type = action.payload;
    },
    clearFilter: (state) => {
      state.search = "";
      state.type = "";
    },
    gotoNextPage: (state) => {
      state.pagination.currentPage += 1;
    },
    gotoPrevPage: (state) => {
      state.pagination.currentPage -= 1;
    },
    changePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
      state.pagination.currentPage = 1;
    },
  },
});

export default filterSlice.reducer;

export const {
  searched,
  filterByType,
  clearFilter,
  gotoNextPage,
  gotoPrevPage,
  changePage,
  resetCurrentPage,
} = filterSlice.actions;
