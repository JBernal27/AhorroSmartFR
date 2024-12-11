import {Button, Divider, FAB, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainAppbar from './components/main-appbar.component';
import {ScrollView, View} from 'react-native';
import TransactionModalForm from './components/modal-transaction.component';
import BudgetModalForm from './components/modal-budget.component';
import BudgetProgress from './components/budget-progress.component';
import IncomeExpenseChart from './components/expenses-vs-incomes.component';
import {styles} from './styles/home.styles';
import Loader from '../../utilities/components/loader.utility';
import {useHome} from './hooks/use-home.hook';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const {
    budget,
    isLoading,
    isTransactionModalVisible,
    setIsTransactionModalVisible,
    isBudgetModalVisible,
    setIsBudgetModalVisible,
    isOpen,
    setIsOpen,
  } = useHome();

  console.log('rerender');

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.background}]}>
      {isLoading && <Loader visible />}
      <MainAppbar />
      <ScrollView
        style={[styles.scrollView, {backgroundColor: theme.colors.background}]}>
        {budget ? (
          <BudgetProgress budget={budget} />
        ) : (
          <View style={styles.emptyBudgetContainer}>
            <Button
              mode="contained"
              onPress={() => setIsBudgetModalVisible(true)}>
              Genera tu presupuesto para este mes
            </Button>
          </View>
        )}
        <Divider style={styles.divider} />
        <IncomeExpenseChart />
      </ScrollView>
      <Divider />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Jose Manuel Bernal - 2024©</Text>
      </View>
      <FAB.Group
        open={isOpen}
        visible
        fabStyle={[{backgroundColor: theme.colors.primary}]}
        icon={isOpen ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'cash-multiple',
            label: 'Transacción',
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
