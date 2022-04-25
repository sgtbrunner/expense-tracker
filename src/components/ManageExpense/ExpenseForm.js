import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../UI/Button';
import Input from './Input';
import { getFormattedDate } from '../../utils/date';

const ExpenseForm = ({
  defaultValues,
  onCancel,
  onSubmit,
  submitButtonLabel,
}) => {
  const [input, setInput] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });
  const inputChangedHandler = (inputIdentifier, enteredInput) => {
    setInput((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: enteredInput,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount,
      date: new Date(input.date),
      description: input.description,
    };

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
            value: input.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
            value: input.date,
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangedHandler('description', value),
          value: input.description,
        }}
      />
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
});

export default ExpenseForm;
