import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Text, useTheme} from 'react-native-paper';
import {LineChart} from 'react-native-gifted-charts';
import Loader from '../../../utilities/components/loader.utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../router/navigation';
import useIncomeExpenseChart from '../hooks/expenses-vs-incomes.hook';
import styles from '../styles/expenses-vs-incomes.styles';

const IncomeExpenseChart = ({triggerRefresh}: {triggerRefresh: boolean}) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isLoading, data} = useIncomeExpenseChart(triggerRefresh);

  return (
    <View
      style={[
        styles.container,
        {boxShadow: `0px 0px 30px ${theme.colors.elevation.level5}`},
      ]}>
      <Loader visible={isLoading} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          variant="titleLarge"
          style={[styles.title, {color: theme.colors.onBackground}]}>
          Transacciones
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Transactions')}
          style={[styles.button, {backgroundColor: theme.colors.primary}]}>
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.onPrimary,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <View
            style={[
              {width: 12, height: 12, borderRadius: 50},
              {backgroundColor: theme.colors.primary},
            ]}></View>
          <Text variant="bodySmall" style={{color: theme.colors.onBackground}}>
            {new Intl.NumberFormat('es-ES').format(data.totalIncome)} COP
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <View
            style={[
              {width: 12, height: 12, borderRadius: 50},
              {backgroundColor: theme.colors.error},
            ]}></View>
          <Text variant="bodySmall" style={{color: theme.colors.onBackground}}>
            {new Intl.NumberFormat('es-ES').format(data.totalExpenses)} COP
          </Text>
        </View>
      </View>
      <LineChart
        areaChart
        curved
        data={data.expenses}
        data2={data.incomes}
        width={250}
        height={200}
        spacing={35}
        xAxisLabelTextStyle={{color: theme.colors.onBackground}}
        yAxisTextStyle={{color: theme.colors.onBackground}}
        yAxisTextNumberOfLines={1}
        stepValue={data.maxStepValue}
        yAxisLabelSuffix="K"
        xAxisColor="lightgray"
        yAxisColor="lightgray"
        dataPointsColor2={theme.colors.primary}
        dataPointsColor1={theme.colors.error}
        dataPointsRadius={4}
        hideRules={false}
        rulesColor="lightgray"
        color2={theme.colors.primary}
        color1={theme.colors.error}
        startFillColor2={theme.colors.primary}
        startFillColor1={theme.colors.error}
        startOpacity={0.7}
        endOpacity={0.2}
      />
    </View>
  );
};

export default IncomeExpenseChart;
