/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import MainScreen from './screens/MainScreen';
import Login from './screens/LoginScreen';
import Register from './screens/Register';
import Homepage from './screens/Homepage';

AppRegistry.registerComponent(appName, () => () => <Homepage />);
