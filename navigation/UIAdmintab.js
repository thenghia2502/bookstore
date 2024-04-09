/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomepage from '../screens/admin/AdminHomepage';
import AddBook from '../screens/admin/Addbook';
import UpdateBook from '../screens/admin/Update';
import OrderManager from '../screens/admin/Order';
import UserManager from '../screens/admin/User';
import Account from '../screens/admin/Account';

const Tab = createBottomTabNavigator();
const UIAdminTab = (props) => {
    return <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name={'AdminHomepage'} component={AdminHomepage}/>
        <Tab.Screen name={'AddBook'} component={AddBook}/>
        <Tab.Screen name={'UpdateBook'} component={UpdateBook} tabBarOptions={{ tabBarVisible: false}}/>
        <Tab.Screen name={'OrderManager'} component={OrderManager} options={{ }}/>
        <Tab.Screen name={'UserManager'} component={UserManager}/>
        <Tab.Screen name={'Account'} component={Account}/>
    </Tab.Navigator>;
};

export default UIAdminTab;
