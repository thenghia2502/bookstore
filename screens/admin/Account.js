/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserData } from '../../slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Account = () => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const navigation = useNavigation();
    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('Login');
    };
    return (
        <SafeAreaView>
            <Text style={{textAlign:'center'}}>--ACCOUNT--</Text>
            <Text>{userData.name}</Text>
            <Text>{userData.username}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{textAlign:'center'}}>Dang xuat</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Account;
