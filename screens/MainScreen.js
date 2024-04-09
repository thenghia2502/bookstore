/* eslint-disable prettier/prettier */
import React from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput} from 'react-native';

function MainScreen({navigation}){
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login');
        }, 2000); // Thời gian chờ trước khi chuyển đến màn hình Login (3000 miligiây = 3 giây)
        return () => clearTimeout(timer);
      }, [navigation]);
    return <View style={styles.one}>
        <View style={styles.two}>
            <Text style={styles.three}>NSHOP</Text>
        </View>
    </View>;
}
const styles = StyleSheet.create({
    one:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
  });
export default MainScreen;
