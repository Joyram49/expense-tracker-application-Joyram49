import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import transactionListReducer from "../features/AllTransaction/transactionListSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    allTransaction: transactionListReducer,
    filter: filterReducer,
  },
});
