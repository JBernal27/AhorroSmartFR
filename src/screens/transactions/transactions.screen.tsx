import React, {useState} from 'react';
import {Appbar, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TransactionCard from './components/transaction-card.component';
import {RootStackParamList} from '../../router/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, ScrollView, View} from 'react-native';
import FilterHeader from './components/filter-header.component';
import useTransactions from './hooks/transactions.hook';
import Loader from '../../utilities/components/loader.utility';

const TransactionsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {filteredTransactions, filters, setFilters, setTriggerRefresh, triggerRefresh, isLoading, setIsLoading} = useTransactions();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Loader visible={isLoading} />
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction
          color={theme.colors.onBackground}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          color={theme.colors.onBackground}
          title="Transacciones"
        />
      </Appbar.Header>
      <FilterHeader filters={filters} onFilterChange={setFilters} />
      {filteredTransactions.length > 0 ? (
        <ScrollView style={{flex: 1, gap: 5}}>
          {filteredTransactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              refreshTransactions={() => setTriggerRefresh(!triggerRefresh)}
              setIsLoading={setIsLoading}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/void.png')}
            style={{width: 170, height: 170}}
          />
          <Text
            variant="titleLarge"
            style={{textAlign: 'center', color: theme.colors.onBackground}}>
            No hay transacciones para mostrar
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionsScreen;
