import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransactionall,
  deleteTransactionall,
  editTransactionall,
  getTransactionsall,
} from "./transactionListApi";

// initial state
const initialState = {
  allTransactions: [],
  isLoading: false,
  isError: false,
  error: "",
  total: 1,
  currentTransaction: {},
};

export const fetchAllTransactions = createAsyncThunk(
  "allTransaction/fetchTransactins",
  async ({ search, type, currentPage, limit }) => {
    const transactions = await getTransactionsall(
      search,
      type,
      currentPage,
      limit
    );
    return transactions;
  }
);

export const createAllTransaction = createAsyncThunk(
  "allTransaction/createTransaction",
  async (data) => {
    const transaction = await addTransactionall(data);
    return transaction;
  }
);

export const updateAllTransaction = createAsyncThunk(
  "allTransaction/updateTransaction",
  async ({ id, data }) => {
    const transaction = await editTransactionall({ id, data });
    return transaction;
  }
);

export const removeAllTransaction = createAsyncThunk(
  "allTransaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransactionall(id);
    return transaction;
  }
);

const transactionAllSlice = createSlice({
  name: "allTransaction",
  initialState,
  reducers: {
    updateActive: (state, action) => {
      state.currentTransaction = action.payload;
    },
    updateInactive: (state) => {
      state.currentTransaction = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.allTransactions = action.payload.data;
        state.total = action.payload.totalTransactions;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
        state.allTransactions = [];
      })
      .addCase(createAllTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createAllTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.allTransactions.unshift(action.payload);
      })
      .addCase(createAllTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateAllTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateAllTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexToUpdate = state.allTransactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.allTransactions[indexToUpdate] = action.payload;
      })
      .addCase(updateAllTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeAllTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeAllTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.allTransactions = state.allTransactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeAllTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default transactionAllSlice.reducer;
export const { updateActive, updateInactive } = transactionAllSlice.actions;
