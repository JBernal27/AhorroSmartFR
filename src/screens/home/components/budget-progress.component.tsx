import React from 'react';
import {View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Text, useTheme} from 'react-native-paper';

import {Dimensions} from 'react-native';
import {IBudget} from '../../../common/interfaces/budget.interface';
const screenWidth = Dimensions.get('window').width;

export default function BudgetProgress({budget}: {budget: IBudget}) {
  const theme = useTheme();

  return (
    <View>
      <Text
        variant="displaySmall"
        style={{
          fontWeight: '900',
          textAlign: 'center',
        }}>
        Diciembre
      </Text>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
        }}>
        <ProgressChart
          data={{
            data: [budget.percentage / 100 > 1 ? 1 : budget.percentage / 100],
          }}
          width={screenWidth}
          height={180}
          strokeWidth={16}
          radius={61}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 2,
            color: (opacity = 1) => {
              return budget.percentage / 100 < 0.75
                      ? `rgba(0, 107 , 94, ${opacity})`
                      : budget.percentage / 100 < 1
                        ? `rgba(255, 243, 205, ${opacity})`
                        : theme.colors.error;
            },
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '1',
              strokeWidth: '2',
              stroke: theme.colors.primary,
            },
          }}
          hideLegend={true}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="headlineLarge">{budget.percentage.toFixed(1)}%</Text>
          <Text
            variant="bodyLarge"
            style={{
              fontWeight: '900',
            }}>
            Gastado
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
          }}>
          <View>
            <Text variant="bodyLarge" style={{fontWeight: '900'}}>
              Gastos
            </Text>
            <Text variant="bodyLarge" style={{fontWeight: '400'}}>
              ${new Intl.NumberFormat('es-Es').format(budget.totalExpenses)} COP
            </Text>
          </View>
          <View>
            <Text
              variant="bodyLarge"
              style={{fontWeight: '900', textAlign: 'right'}}>
              Presupuesto
            </Text>
            <Text variant="bodyLarge" style={{fontWeight: '400'}}>
              ${new Intl.NumberFormat('es-Es').format(budget.amount)} COP
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
