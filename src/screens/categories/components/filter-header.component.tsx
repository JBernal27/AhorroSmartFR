import React, {useState, useRef} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {IconButton, Text, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ExpenseCategory, expenseCategoryTranslations} from '../../../common/enums/expense-category.enum';
import { styles } from '../styles/filter-header.styles';

const FilterHeader = ({
  filters,
  onFilterChange,
}: {
  filters: {
    name: string;
    date: Date;
  };
  onFilterChange: (updatedFilters: typeof filters) => void;
}) => {
  const theme = useTheme();
  const categories = useRef<{label: string; value: ExpenseCategory | ''}[]>([
    {label: 'Todas', value: ''},
  ]);
   Object.keys(expenseCategoryTranslations).forEach(key => {
      categories.current.push({
        label: expenseCategoryTranslations[key as ExpenseCategory],
        value: key as ExpenseCategory,
      });
    });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const transactionTypes = [
    {label: 'Todos', value: ''},
    {label: 'Ingresos', value: 'Income'},
    {label: 'Gastos', value: 'Expense'},
  ];

  const renderDropdownItem = (item: any) => (
    <View style={[styles.item, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.textItem, {color: theme.colors.onBackground}]}>
        {item.label}
      </Text>
    </View>
  );

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = {...filters, ...newFilters};
    onFilterChange(updatedFilters);
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{paddingHorizontal: 10, alignItems: 'center'}}
      style={{
        backgroundColor: theme.colors.background,
        maxHeight: 80,
        marginBottom: 10,
      }}>
      {/* Categoría */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, {color: theme.colors.onBackground}]}>
          Categoría:{' '}
        </Text>
        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.onBackground,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: theme.colors.onBackground},
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            {color: theme.colors.onBackground},
          ]}
          iconStyle={styles.iconStyle}
          data={categories.current}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Selecciona una categoría"
          value={filters.name}
          onChange={(item: any) => updateFilters({name: item.value})}
          renderItem={renderDropdownItem}
        />
      </View>

      {/* Fecha */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, {color: theme.colors.onBackground}]}>
          Fecha:{' '}
        </Text>
        <TouchableOpacity
          style={[styles.dateButton, {backgroundColor: theme.colors.primary}]}
          onPress={() => setShowDatePicker(true)}>
          <Text
            style={{color: theme.colors.onPrimary, fontWeight: 'bold'}}
            variant="bodyLarge">
            {filters.date
              ? filters.date.toLocaleDateString('es-ES')
              : 'Selecciona una fecha'}
          </Text>
          {new Date(filters.date).getUTCMonth() != new Date().getUTCMonth() && (
            <IconButton
              icon={'close'}
              size={18}
              onPress={() => updateFilters({date: new Date()})}
              iconColor={theme.colors.onPrimary}
            />
          )}
        </TouchableOpacity>
        <View>
          {showDatePicker && (
            <DateTimePicker
              value={filters.date || new Date()}
              mode="date"
              display="spinner"
              locale="es"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) updateFilters({date: selectedDate});
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FilterHeader;