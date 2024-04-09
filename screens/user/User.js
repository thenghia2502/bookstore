/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { useNavigation } from '@react-navigation/native';
const Account = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const navigation = useNavigation();
    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('Login');
    };
    return (
        <View>
            <Text>{userData.name}</Text>
            <Text>{userData.username}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{textAlign:'center'}}>Dang xuat</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Account;
