import React from 'react';
import {View, Modal, Platform} from 'react-native';
import {
  Button,
  TextInput,
  useTheme,
  Text,
  HelperText,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../../utilities/components/loader.utility';
import {Controller} from 'react-hook-form';
import { useBudgetForm } from '../hooks/use-modal-budget.hook';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../styles/modal-budget.styles';

const BudgetModalForm = ({onClose}: {onClose: () => void}) => {
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
  } = useBudgetForm(onClose);

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
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.formContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={styles.title} variant="headlineMedium">
            Crear Presupuesto
          </Text>

          {/* Cantidad */}
          <Controller
            control={control}
            name="amount"
            rules={{
              validate: value => parseInt(value) > 0 || 'Debe ser mayor a 0',
            }}
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  label="Cantidad*"
                  value={value ? value.toString() : ''}
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

          {/* Presupuesto */}
          <Controller
            control={control}
            name="category"
            rules={{
              validate: value => value !== '' || 'Debes seleccionar una categoria',
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
                {errors.category && (
                  <HelperText type="error">
                    {errors.category.message}
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
                    Mes y año: {value.toDateString()}
                  </Button>
                {errors.date && (
                  <HelperText type="error">{errors.date.message}</HelperText>
                )}
                {showDatePicker && (
                  <DateTimePicker
                    value={value}
                    mode="date"
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
      </View>
    </Modal>
  );
};

export default BudgetModalForm;
