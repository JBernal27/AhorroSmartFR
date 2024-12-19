import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {PieChart} from 'react-native-gifted-charts';
import Loader from '../../../utilities/components/loader.utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../router/navigation';
import useCategoriesChart from '../hooks/categories-chart.hook';
import styles from '../styles/categories-chart.styles';

const CategoriesChart = ({triggerRefresh}: {triggerRefresh: boolean}) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isLoading, data, maxExpense} = useCategoriesChart(triggerRefresh);

  const renderLegend = () =>
    data
      .sort((a, b) => a.label.length - b.label.length)
      .map(item => (
        <View key={item.label} style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: item.color}]} />
          <Text style={[styles.legendText, {color: theme.colors.onBackground}]}>
            {item.label}: {item.value}%
          </Text>
        </View>
      ));

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Budgets')}
      style={[
        styles.container,
        {boxShadow: `0px 0px 30px ${theme.colors.elevation.level5}`},
      ]}>
      <Loader visible={isLoading} />
      <View style={styles.header}>
        <Text
          variant="titleLarge"
          style={[styles.title, {color: theme.colors.onBackground}]}>
          Gastos por Categorías
        </Text>
      </View>
      <View style={styles.pieChartWrapper}>
        {isLoading ? (
          <Text
            style={[styles.loadingText, {color: theme.colors.onBackground}]}>
            Cargando...
          </Text>
        ) : (
          <>
            <PieChart
              data={data}
              donut
              sectionAutoFocus
              radius={75}
              innerRadius={40}
              innerCircleColor={theme.colors.background}
              centerLabelComponent={() => (
                <View style={styles.pieChartCenterLabel}>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.pieChartAmountText,
                      {color: theme.colors.onBackground},
                    ]}>
                    {new Intl.NumberFormat('es-ES').format(
                      maxExpense.current.value,
                    )}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={[
                      styles.pieChartCategoryText,
                      {color: theme.colors.onBackground},
                    ]}>
                    {maxExpense.current.name}
                  </Text>
                </View>
              )}
            />
            <View style={styles.legendContainer}>{renderLegend()}</View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesChart;
