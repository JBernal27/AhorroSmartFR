import React from 'react';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, ScrollView, View } from 'react-native';
import FilterHeader from './components/filter-header.component';
import CategoryCard from './components/category-card.component';
import Loader from '../../utilities/components/loader.utility';
import useBudgets from './hooks/categories.hook';

const BudgetsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    filteredCategories,
    filters,
    isLoading,
    handleFilterChange,
    triggerRefresh,
    setTriggerRefresh,
    setIsLoading,
  } = useBudgets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Loader visible={isLoading} />
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction
          color={theme.colors.onBackground}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          color={theme.colors.onBackground}
          title="Presupuestos"
        />
      </Appbar.Header>
      <FilterHeader filters={filters} onFilterChange={handleFilterChange} />
      {filteredCategories.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isLoading={isLoading}
              triggerRefresh={triggerRefresh}
              setTriggerRefresh={setTriggerRefresh}
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
          }}
        >
          <Image
            source={require('../../assets/void.png')}
            style={{ width: 170, height: 170 }}
          />
          <Text
            variant="titleLarge"
            style={{ textAlign: 'center', color: theme.colors.onBackground }}
          >
            No hay presupuestos para mostrar
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BudgetsScreen;
