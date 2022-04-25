import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../UI/Button';
import Input from './Input';
import { getFormattedDate } from '../../utils/date';

import GlobalStyles from '../../constants/styles';

const ExpenseForm = ({
  defaultValues,
  onCancel,
  onSubmit,
  submitButtonLabel,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifier, enteredInput) => {
    setInput((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredInput, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInput((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: amountIsValid },
          date: { value: currentInput.date.value, isValid: dateIsValid },
          description: {
            value: currentInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
            value: input.date?.value,
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!input.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangedHandler('description', value),
          value: input.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your input data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
