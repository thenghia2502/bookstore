/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {AsyncStorage} from 'react-native';

const Login = (props) =>{
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const hanleLogin = async () => {
        try {
            const response = await fetch('your_login_api_endpoint', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ /* your login credentials */ }),
            });
            const data = await response.json();
            const { savetoken, saverole} = data;
            // Lưu token và role vào AsyncStorage
            await AsyncStorage.setItem('token', savetoken);
            await AsyncStorage.setItem('role', saverole);
            // Set token state cho việc hiển thị hoặc kiểm tra trong ứng dụng
            setToken(savetoken);
          } catch (error) {
            console.error('Error logging in:', error);
          }
    }
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
            onChangeText={setUserName}
            value={username}
            />
        <TextInput style={styles.password}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassWord}/>
        <Text style={styles.notification}>Tài khoản hoặc mật khẩu không chính xác</Text>
        <TouchableOpacity style={styles.button} onPress={hanleLogin()}>
            <Text>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.box}>
            <Text>Bạn đã có tài khoản chưa?</Text>
            <Text style={styles.register}>Đăng ký</Text>
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
