import { StyleSheet, Text, TextInput, View } from 'react-native';

import GlobalStyles from '../../constants/styles';

const Input = ({ invalid, label, style, textInputConfig }) => {
  const isMultiline = textInputConfig && textInputConfig.multiline;
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isMultiline && styles.inputMultiline,
          invalid && styles.invaliInput,
        ]}
        {...textInputConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invaliInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;
