import {FAB, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainAppbar from './components/main-appbar.component';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import TransactionModalForm from './components/modal-transaction.component';
import BudgetModalForm from './components/modal-budget.component';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <MainAppbar />
      <FAB.Group
        open={isOpen}
        visible
        fabStyle={[{backgroundColor: theme.colors.primary}]}
        icon={isOpen ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'cash-multiple',
            label: 'Transaccion',
            onPress: () => setIsTransactionModalVisible(true),
          },
          {
            icon: 'note-edit',
            label: 'Presupuesto',
            onPress: () => setIsBudgetModalVisible(true),
          },
        ]}
        onStateChange={state => setIsOpen(state.open)}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isTransactionModalVisible && (
        <TransactionModalForm
          onClose={() => setIsTransactionModalVisible(false)}
        />
      )}
      {isBudgetModalVisible && (
        <BudgetModalForm onClose={() => setIsBudgetModalVisible(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  radioGroup: {
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
