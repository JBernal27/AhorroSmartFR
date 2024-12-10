import {Divider, FAB, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainAppbar from './components/main-appbar.component';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import TransactionModalForm from './components/modal-transaction.component';
import BudgetModalForm from './components/modal-budget.component';
import BudgetProgress from './components/budget-progress.component';
import IncomeExpenseChart from './components/expenses-vs-incomes.component';
import {styles} from './styles/home.styles';
import {BudgetService} from '../../services/budget.service';
import {GlobalContext} from '../../context/global.context';
import {IBudget} from '../../common/interfaces/budget.interface';
import Loader from '../../utilities/components/loader.utility';

const initialBudget: IBudget = {
  id: 0,
  amount: 0,
  date: new Date('2024-01-01T00:00:00.000Z'),
  totalExpenses: 0,
  totalIncomes: 0,
  percentage: 0.0,
  remaining: 0
}

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(GlobalContext);
  const [budget, setBudget] = useState<IBudget>(initialBudget);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      setIsLoading(true);
      try {
        const budget = await BudgetService.get(new Date());
        setBudget(budget);
      } catch (error) {
        context?.setSnackbarInfo({
          message: 'Error al obtener el budget.',
          type: 'error',
          isVisible: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBudget();
  }, []);  

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.colors.background}]}>
      {isLoading && <Loader visible />}
      <MainAppbar />
      <ScrollView
        style={[styles.scrollView, {backgroundColor: theme.colors.background}]}>
        <BudgetProgress budget={budget} />
        <Divider style={styles.divider} />
        <IncomeExpenseChart budget={budget} />
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
