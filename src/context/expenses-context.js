import { createContext, useReducer } from 'react';

const ADD = 'ADD';
const DELETE = 'DELETE';
const SET = 'SET';
const UPDATE = 'UPDATE';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [action.payload, ...state];
    case DELETE:
      return state.filter((expense) => expense.id !== action.payload);
    case SET:
      return action.payload.reverse();
    case UPDATE:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: ADD, payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: DELETE, payload: id });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: SET, payload: expenses });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: UPDATE, payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expenseState,
    addExpense,
    deleteExpense,
    setExpenses,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
