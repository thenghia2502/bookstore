/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput} from 'react-native';

function MainScreen(props){
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
