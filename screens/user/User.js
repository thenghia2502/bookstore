/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
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
        <View style={{flex:1, backgroundColor :'#E0E8F6'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Homepage')}>

                    <Image source={require('../../assets/left-arrow-svgrepo-com.png')} style={{ height: 30, width: 30, }}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20}}>Account</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20}}>
                <Text style={{width: '20%'}}>Tên:</Text>
                <Text style={{textAlign: 'center', width: '80%'}}>{userData.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom:20}}>
                <Text style={{width: '20%'}}>Email:</Text>
                <Text style={{textAlign: 'center', width: '80%'}}>{userData.username}</Text>
            </View>
            <TouchableOpacity style={{borderWidth: 1, borderColor: 'darkgrey', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white'}} onPress={handleLogout}>
                <Text style={{textAlign:'center'}}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Account;
