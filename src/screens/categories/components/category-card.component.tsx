import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Menu, Text, useTheme, Dialog, Button, Portal} from 'react-native-paper';
import {ICategorizedBudget} from '../../../common/interfaces/categorized-budget.interface';
import {expenseCategoryTranslations} from '../../../common/enums/expense-category.enum';
import {PieChart} from 'react-native-gifted-charts';
import styles from '../styles/categories-card.styles';
import BudgetModalForm from '../../home/components/modal-budget.component';
import {CategorizedBudgetService} from '../../../services/categorized-budget.service';
import {GlobalContext} from '../../../context/global.context';

export default function CategoryCard({
  category,
  triggerRefresh,
  setIsLoading,
  setTriggerRefresh,
}: {
  isLoading: boolean;
  triggerRefresh: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategorizedBudget;
}) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const context = useContext(GlobalContext);

  const percentage = (category.totalExpenses / category.amount) * 100;
  const chartColor =
    percentage < 75
      ? theme.colors.primary
      : percentage > 90
      ? theme.colors.error
      : theme.colors.tertiary;

  const handleMenuOpen = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;
    setMenuPosition({x: pageX, y: pageY});
    setMenuVisible(true);
  };

  const handleMenuClose = () => setMenuVisible(false);

  const handleEdit = () => {
    setMenuVisible(false);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    setIsDialogVisible(false);
    setIsLoading(true);
    try {
      await CategorizedBudgetService.delete(category.id);
      context?.setSnackbarInfo({
        message: 'Presupuesto eliminado correctamente',
        type: 'success',
        isVisible: true,
      });
      setTriggerRefresh(!triggerRefresh);
    } catch (error) {
      context?.setSnackbarInfo({
        message: 'Error al eliminar el presupuesto. Intenta nuevamente',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.cardContainer} onPress={handleMenuOpen}>
        <View style={styles.chartContainer}>
          <View style={styles.textContainer}>
            <Text variant="titleLarge" style={styles.categoryName}>
              {expenseCategoryTranslations[category.category]}
            </Text>
            <Text
              variant="bodySmall"
              style={[{color: theme.colors.onSurfaceDisabled}]}>
              ${new Intl.NumberFormat('es-ES').format(category.amount)} COP
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              variant="labelMedium"
              style={[styles.totalExpense, {color: theme.colors.error}]}>
              ${new Intl.NumberFormat('es-ES').format(category.totalExpenses)}{' '}
              COP
            </Text>
            <Text variant="labelMedium" style={[{color: theme.colors.primary}]}>
              ${new Intl.NumberFormat('es-ES').format(category.totalIncomes)}{' '}
              COP
            </Text>
          </View>
          <View style={styles.pieChartContainer}>
            <PieChart
              donut
              radius={35}
              innerRadius={25}
              data={[
                {value: percentage, color: chartColor},
                {value: 100 - percentage, color: 'lightgray'},
              ]}
              innerCircleColor={theme.colors.background}
              centerLabelComponent={() => (
                <Text style={styles.centerLabel}>{`${percentage.toFixed(
                  0,
                )}%`}</Text>
              )}
            />
          </View>
        </View>

        <Menu
          visible={menuVisible}
          onDismiss={handleMenuClose}
          anchor={{x: menuPosition.x, y: menuPosition.y}}>
          <Menu.Item onPress={handleEdit} title="Editar" leadingIcon="pencil" />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              setIsDialogVisible(true);
            }}
            title="Eliminar"
            leadingIcon="delete"
          />
        </Menu>
      </TouchableOpacity>

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          style={{backgroundColor: theme.colors.background}}
          >
          <Dialog.Icon icon="alert" color={theme.colors.error} size={44}/>
          <Dialog.Title style={{color: theme.colors.error, fontWeight: 'bold'}}>¿Eliminar {expenseCategoryTranslations[category.category]}?</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyLarge'>
              ¿Estás seguro de que deseas eliminar este presupuesto? Al hacerlo
              se eliminara de forma permanente junto con todas las transacciones
              asociadas.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancelar</Button>
            <Button mode='contained' buttonColor={theme.colors.error} style={{width:'30%'}} textColor={theme.colors.onError} onPress={handleDelete}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isModalVisible && (
        <BudgetModalForm
          budget={{...category, date: category.budget.date}}
          onClose={handleModalClose}
          refreshHome={() => setTriggerRefresh(!triggerRefresh)}
        />
      )}
    </>
  );
}
