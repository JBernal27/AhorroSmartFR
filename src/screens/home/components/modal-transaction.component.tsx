import React from 'react';
import {View, Modal, Platform, ScrollView} from 'react-native';
import {
  Button,
  TextInput,
  useTheme,
  RadioButton,
  Text,
  HelperText,
  Icon,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../../../utilities/components/loader.utility';
import styles from '../styles/modal-transaction.styles';
import {Controller} from 'react-hook-form';
import { useTransactionForm } from '../hooks/use-modal-transaction.hook';

const TransactionModalForm = ({onClose}: {onClose: () => void}) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    errors,
    showDatePicker,
    setShowDatePicker,
    isLoading,
    categories,
    onSubmit,
  } = useTransactionForm(onClose);

  const renderItem = (item: any) => (
    <View style={[styles.item, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.textItem, {color: theme.colors.onBackground}]}>
        {item.label}
      </Text>
    </View>
  );

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <Loader visible={isLoading} />
      <ScrollView style={styles.modalContainer}>
        <View
          style={[
            styles.formContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={styles.title} variant="headlineMedium">
            Crear Transacción
          </Text>

          {/* Nombre */}
          <Controller
            control={control}
            name="name"
            rules={{required: 'Campo requerido'}}
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  label="Nombre*"
                  value={value}
                  mode="outlined"
                  style={styles.input}
                  onChangeText={onChange}
                />
                {errors.name && (
                  <HelperText type="error">{errors.name.message}</HelperText>
                )}
              </>
            )}
          />

          {/* Tipo */}
          <Controller
            control={control}
            name="type"
            rules={{required: 'Campo requerido'}}
            render={({field: {onChange, value}}) => (
              <>
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                      <RadioButton value="Income" />
                      <Text>Ingreso</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="Expense" />
                      <Text>Gasto</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                {errors.type && (
                  <HelperText type="error">{errors.type.message}</HelperText>
                )}
              </>
            )}
          />

          {/* Cantidad */}
          <Controller
            control={control}
            name="amount"
            rules={{
              required: 'Campo requerido',
              validate: value => parseInt(value) > 0 || 'Debe ser mayor a 0',
            }}
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  label="Cantidad*"
                  value={value ? value : ''}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.input}
                  onChangeText={text =>
                    onChange(text === '' ? '' : parseInt(text))
                  }
                />
                {errors.amount && (
                  <HelperText type="error">{errors.amount.message}</HelperText>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="note"
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  label="Descripción"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                />
                {errors.note && (
                  <HelperText type="error">{errors.note.message}</HelperText>
                )}
              </>
            )}
          />

          {/* Presupuesto */}
          <Controller
            control={control}
            name="categorizedBudgetId"
            rules={{
              required: 'Campo requerido',
              validate: value =>
                value > 0 || 'Debes seleccionar un presupuesto',
            }}
            render={({field: {onChange, value}}) => (
              <>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor:
                        categories.length > 0
                          ? theme.colors.onBackground
                          : theme.colors.error,
                    },
                  ]}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    {
                      color:
                        categories.length > 0
                          ? theme.colors.onBackground
                          : theme.colors.error,
                    },
                  ]}
                  selectedTextStyle={[
                    styles.selectedTextStyle,
                    {color: theme.colors.onBackground},
                  ]}
                  iconStyle={styles.iconStyle}
                  data={categories}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    categories.length > 0
                      ? 'Selecciona la categoria*'
                      : 'Debes tener mínimo un presupuesto'
                  }
                  value={value}
                  onChange={(item: any) => onChange(item.value)}
                  renderItem={renderItem}
                  disable={categories.length === 0}
                />
                {errors.categorizedBudgetId && (
                  <HelperText type="error">
                    {errors.categorizedBudgetId.message}
                  </HelperText>
                )}
              </>
            )}
          />

          {/* Fecha */}
          <Controller
            control={control}
            name="date"
            rules={{required: 'Campo requerido'}}
            render={({field: {onChange, value}}) => (
              <>
                  <Button
                    mode="elevated"
                    onPress={() => setShowDatePicker(true)}
                    icon={'calendar'}>
                    Fecha: {value.toDateString()}
                  </Button>
                {errors.date && (
                  <HelperText type="error">{errors.date.message}</HelperText>
                )}
                {showDatePicker && (
                  <DateTimePicker
                    value={value}
                    mode="date"
                    maximumDate={new Date()}
                    minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                    locale="es"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(_, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) onChange(selectedDate);
                    }}
                  />
                )}
              </>
            )}
          />

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.button}>
              Añadir
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                reset();
                onClose();
              }}
              style={styles.button}>
              Cancelar
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default TransactionModalForm;
