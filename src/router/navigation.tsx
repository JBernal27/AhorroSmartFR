import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/home/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/login.screen';
import RegisterScreen from '../screens/register/register.screen';
import { GlobalContext } from '../context/global.context';
import SettingsScreen from '../screens/settigns/settings.screen';
import TransactionsScreen from '../screens/transactions/transactions.screen';
import BudgetsScreen from '../screens/categories/categories.screen';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Settings: undefined;
    Transactions: undefined;
    Budgets: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
    const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | undefined>();
    const context = useContext(GlobalContext);

    useEffect(() => {
        if (context?.settings) {
            // if (context.settings.isFirstTime) {
            //     setInitialRouteName('Home');
            // } else {
                if (context.settings.token) {
                    setInitialRouteName('Home');
                } else {
                    setInitialRouteName('Login');
                }
            // }
        }
    }, [context?.settings]);

    if (!initialRouteName) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Budgets" component={BudgetsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
