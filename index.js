/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import MainScreen from './screens/MainScreen';
import Login from './screens/LoginScreen';
import Register from './screens/Register';
import Homepage from './screens/user/Homepage';
import AddBook from './screens/admin/Addbook';
import OrderManager from './screens/admin/Order';
import AdminHomepage from './screens/admin/AdminHomepage';
import UpdateBook from './screens/admin/Update';
import UserManager from './screens/admin/User';
import Cart from './screens/user/Cart';
import OneUser from './screens/user/User';
import UITab from './navigation/UIClienttab';
import App from './navigation/App';

AppRegistry.registerComponent(appName, () => () => <App/>);
