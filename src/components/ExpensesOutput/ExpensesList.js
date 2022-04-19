import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ list }) => {
  return (
    <FlatList
      data={list}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
