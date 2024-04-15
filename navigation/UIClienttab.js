/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/user/Homepage';
import Cart from '../screens/user/Cart';
import Account from '../screens/user/User';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookDetail from '../screens/user/BookDetail';
const Stack = createNativeStackNavigator();

const UIClientTab = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Homepage'} component={Homepage}/>
            <Stack.Screen name={'Cart'} component={Cart}/>
            <Stack.Screen name={'BookDetail'} component={BookDetail}/>
            <Stack.Screen name={'Account'} component={Account}/>
        </Stack.Navigator>
    );
};

export default UIClientTab;