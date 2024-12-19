import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Icon,
  Text,
  useTheme,
  Menu,
  Dialog,
  Button,
  Portal,
} from 'react-native-paper';
import {
  expenseCategoryIcons,
  expenseCategoryTranslations,
} from '../../../common/enums/expense-category.enum';
import {ITransaction} from '../../../common/interfaces/transaction.interface';
import {getMonthName} from '../../../utilities/get-month-name.utility';
import {TransactionService} from '../../../services/transaction.service';
import TransactionModalForm from '../../home/components/modal-transaction.component';
import {GlobalContext} from '../../../context/global.context';

export default function TransactionCard({
  transaction,
  refreshTransactions,
  setIsLoading,
}: {
  transaction: ITransaction;
  refreshTransactions: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const context = useContext(GlobalContext);

  const handleMenuOpen = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;
    setMenuPosition({x: pageX, y: pageY});
    setMenuVisible(true);
  };

  const handleMenuClose = () => setMenuVisible(false);

  const handleDelete = async () => {
    setIsDialogVisible(false);
    try {
      setIsLoading(true);
      await TransactionService.delete(transaction.id);
      context?.setSnackbarInfo({
        message: 'Transacción eliminada correctamente',
        type: 'success',
        isVisible: true,
      });
      refreshTransactions();
    } catch (error) {
      context?.setSnackbarInfo({
        message: 'Error al eliminar la transacción. Intenta nuevamente',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setMenuVisible(false);
    setIsModalVisible(true);
  };

  const handleModalClose = () => setIsModalVisible(false);

  return (
    <>
      <TouchableOpacity onPress={handleMenuOpen}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            padding: 15,
            justifyContent: 'space-between',
            height: 65,
          }}>
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                width: 45,
                borderRadius: 50,
                backgroundColor: theme.colors.onSurfaceDisabled,
              }}>
              <Icon
                source={
                  expenseCategoryIcons[transaction.categorizedBudget.category]
                }
                size={25}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                {transaction.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceDisabled}}>
                {
                  expenseCategoryTranslations[
                    transaction.categorizedBudget.category
                  ]
                }
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 2,
            }}>
            <Text
              variant="bodyLarge"
              style={{
                fontWeight: 'bold',
                textAlign: 'right',
                color:
                  transaction.type == 'Expense'
                    ? theme.colors.error
                    : theme.colors.primary,
              }}>
              {transaction.type == 'Expense' && '-'} $
              {new Intl.NumberFormat('es-ES').format(transaction.amount)}
            </Text>
            <Text
              variant="labelSmall"
              style={{color: theme.colors.onSurfaceDisabled}}>
              {new Date(transaction.date).getDate()}{' '}
              {getMonthName(new Date(transaction.date)).slice(0, 3)}
              {', '}
              {new Date(transaction.date).getFullYear()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Menu
        visible={menuVisible}
        onDismiss={handleMenuClose}
        anchor={{x: menuPosition.x, y: menuPosition.y}}>
        <Menu.Item onPress={handleEdit} title="Editar" leadingIcon="pencil" />
        <Menu.Item
          onPress={() => {
            handleMenuClose();
            setIsDialogVisible(true);
          }}
          title="Eliminar"
          leadingIcon="delete"
        />
      </Menu>

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          style={{backgroundColor: theme.colors.background}}>
          <Dialog.Icon icon="alert" color={theme.colors.error} size={44} />
          <Dialog.Title style={{color: theme.colors.error, fontWeight: 'bold'}}>
            ¿Eliminar {transaction.name}?
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">
              ¿Estás seguro de que deseas eliminar esta transacción? Esta acción
              no se puede deshacer.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancelar</Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.error}
              style={{width: '30%'}}
              textColor={theme.colors.onError}
              onPress={handleDelete}>
              Eliminar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isModalVisible && (
        <TransactionModalForm
          transaction={transaction}
          onClose={handleModalClose}
          refreshHome={refreshTransactions}
        />
      )}
    </>
  );
}
