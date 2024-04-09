/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/userSlice';

const Login = (props) =>{
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const hanleLogin = async () => {
        const loginCredentials = {
            email: username,
            password: password,
          };
        try {
            const response = await axios.post('http://192.168.43.226:8080/api/auth/authenticate', loginCredentials);
            const data = response.data;
            const { message, name, role, token, username} = data;
            dispatch(loginSuccess({ message, name, role, token, username}));
            console.log("role:", role);
            if (role === 'ADMIN') {
                navigate('UIAdminTab');
            }
            else {
                navigate('UIClientTab');
            }
        } catch (e) {
            setError(true);
        }
    };
    const {navigation, route} = props;
    const {navigate, goBack} = navigation;
    return <View style={{flex: 10}}>
        <View style={styles.shadow}>
            <View style={{flexDirection: 'row'}}>
                <Image source={require('../assets/left-arrow-svgrepo-com.png')} style={{ height: 30, width: 30, }}></Image>
                <Text style={{ fontSize: 20, }}>Đăng nhập</Text>
            </View>
            <Image source={require('../assets/question-circle-svgrepo-com.png')} style={{ height: 30, width: 30, }}></Image>
        </View>
        <View style={styles.contaner}>
        <View style={styles.one}>
            <View style={styles.two}>
                <Text style={styles.three}>NSHOP</Text>
            </View>
        </View>
        <TextInput style={styles.username}
            placeholder="Tài khoản"
            onChangeText={(text) => {
                setUserName(text);
                setError(false); // Reset state lỗi khi người dùng thay đổi mật khẩu
              }}
            value={username}
            />
        <TextInput style={styles.password}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
                setPassWord(text);
                setError(false); // Reset state lỗi khi người dùng thay đổi mật khẩu
              }}/>
        {error && <Text style={styles.notification}>Tài khoản hoặc mật khẩu không chính xác</Text>}
        <TouchableOpacity style={styles.button} onPress={hanleLogin}>
            <Text>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.box}>
            <Text>Bạn đã có tài khoản chưa?</Text>
            <TouchableOpacity
                onPress={()=> {
                    navigate('Register');
                }}>
                <Text style={styles.register}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    shadow:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'space-between',
    },
    one:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    two:{
        backgroundColor: 'orange',
        width: 120,
        height:120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    three:{
        fontSize: 20,
        fontFamily: 'bold',
    },
    contaner:{
        flex: 9,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
        rowGap: 5,
    },
    username:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    password:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    button:{
        borderRadius: 5,
        borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        backgroundColor: '#e6e6fa',
        marginVertical: 10 ,
    },
    notification: {
        color: 'red',
    },
    divider:{
        borderBottomColor: 'black',
        borderBottomWidth: 10,
    },
    box:{
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    register:{
        color: 'steelblue',
        marginLeft: 5,
    },
});

export default Login;
