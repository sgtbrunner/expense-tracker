import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import IconButton from '../components/UI/IconButton';
import GlobalStyles from '../constants/styles';
import { ExpensesContext } from '../context/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch {
      setError('Could not delete expense - please try again later');
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch {
      setError('Could not save data - please try again later');
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && !isSubmitting && (
        <ErrorOverlay message={error} onConfirm={errorHandler} />
      )}
      {isSubmitting && <LoadingOverlay />}
      {!error && !isSubmitting && (
        <View style={styles.container}>
          <ExpenseForm
            defaultValues={selectedExpense}
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
          />
          {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                icon='trash'
                color={GlobalStyles.colors.error500}
                size={24}
                onPress={deleteExpenseHandler}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
