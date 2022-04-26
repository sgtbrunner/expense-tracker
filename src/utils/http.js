import axios from 'axios';

const SERVICE_URL =
  'https://smart-finance-app-4a167-default-rtdb.firebaseio.com';
const EXPENSES_PATH = '/expenses.json';

export const storeExpense = async (expenseData) => {
  const response = await axios.post(SERVICE_URL + EXPENSES_PATH, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const { data } = await axios.get(SERVICE_URL + EXPENSES_PATH);
  const keys = Object.keys(data);

  return keys.map((key) => ({
    id: key,
    amount: data[key].amount,
    date: new Date(data[key].date),
    description: data[key].description,
  }));
};

export const updateExpense = (id, expenseData) => {
  return axios.put(SERVICE_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(SERVICE_URL + `/expenses/${id}.json`);
};
