import axios from "../../utils/axios";

export const getTransactionsall = async (search, type, currentPage, limit) => {
  let queryString = "";
  if (search !== "") {
    queryString += `&q=${search}`;
  }
  if (type !== "") {
    queryString += `&type_like=${type}`;
  }

  if (limit && currentPage) {
    queryString += `&_page=${currentPage}&_limit=${limit}`;
  }

  const response = await axios.get(`/transactions?${queryString}`);
  return {
    data: response.data,
    totalTransactions: response.headers["x-total-count"],
  };
};

export const addTransactionall = async (data) => {
  const response = await axios.post("/transactions", data);

  return response.data;
};

export const editTransactionall = async ({ id, data }) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransactionall = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);

  return response.data;
};
