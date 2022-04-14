import { FlatList, Text } from 'react-native';

const renderExpenseItem = (itemData) => {
  return <Text>{itemData.item.description}</Text>;
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
