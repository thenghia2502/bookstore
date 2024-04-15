/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomepage from '../screens/admin/AdminHomepage';
import AddBook from '../screens/admin/Addbook';
import UpdateBook from '../screens/admin/Update';
import OrderManager from '../screens/admin/Order';
import UserManager from '../screens/admin/User';
import Account from '../screens/admin/Account';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const UIAdminTab = () => {
    return (
        <Stack.Navigator initialRouteName='AdminHomepage' screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'AdminHomepage'} component={AdminHomepage}/>
            <Stack.Screen name={'AddBook'} component={AddBook}/>
            <Stack.Screen name={'UpdateBook'} component={UpdateBook} options={{ tabBarVisible: false }}/>
            <Stack.Screen name={'OrderManager'} component={OrderManager}/>
            <Stack.Screen name={'UserManager'} component={UserManager}/>
            <Stack.Screen name={'Account'} component={Account}/>
        </Stack.Navigator>
    );
};

export default UIAdminTab;
