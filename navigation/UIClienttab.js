/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/user/Homepage';
import Cart from '../screens/user/Cart';
import Account from '../screens/user/User';
const Tab = createBottomTabNavigator();
const UIClientTab = (props) => {
    return <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name={'Homepage'} component={Homepage}/>
        <Tab.Screen name={'Cart'} component={Cart}/>
        <Tab.Screen name={'Account'} component={Account}/>
    </Tab.Navigator>
}

export default UIClientTab;