/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/LoginScreen';
import Register from '../screens/Register';
import MainScreen from '../screens/MainScreen';
import UIClientTab from './UIClienttab';
import UIAdminTab from './UIAdmintab';
import {Provider} from 'react-redux';
import store from '../store';
const Stack = createNativeStackNavigator();
const App = () => {
    return <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='MainScreen' screenOptions={{headerShown:false}}>
                <Stack.Screen name={'MainScreen'} component={MainScreen}/>
                <Stack.Screen name={'Login'} component={Login}/>
                <Stack.Screen name={'Register'} component={Register}/>
                <Stack.Screen name={'UIClientTab'} component={UIClientTab}/>
                <Stack.Screen name={'UIAdminTab'} component={UIAdminTab}/>
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>;
};

export default App;
