import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../context/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch {
        setError('Could not fetch expenses!');
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <>
      {error && !isLoading && (
        <ErrorOverlay message={error} onConfirm={errorHandler} />
      )}
      {isLoading && <LoadingOverlay />}
      {!error && !isLoading && (
        <ExpensesOutput
          expenses={recentExpenses}
          expensesPeriod='Last 7 Days'
          fallbackText='No expenses registered for the last 7 days'
        />
      )}
    </>
  );
};

export default RecentExpenses;
