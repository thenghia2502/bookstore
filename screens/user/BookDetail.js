/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../slices/userSlice';
import { setCart } from '../../slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../utils';
const BookDetail = ({ route }) => {
    const { book } = route.params;
    const userData = useSelector(selectUserData)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const addBookToCart = async (book) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        };
        try {
            await axios.post(`http://192.168.43.226:8080/api/client/cart/add/${book.id}`, config);
            const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
            dispatch(setCart(response.data.data));
            Alert.alert('Success', 'Book added successfully!');
        } catch (error) {
            console.error('Error getting cart:', error);
        }
    };
    return (
        <View style={{ flex: 1 , backgroundColor: '#E0E8F6'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Homepage')}>

                    <Image source={require('../../assets/left-arrow-svgrepo-com.png')} style={{ height: 30, width: 30, }}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Book detail</Text>
            </View>
            <View style={{flex:1, paddingLeft: 10,paddingRight:10, paddingBottom:10, }}>
                <Image source={require('../../assets/yeu-di-dung-so_128823_1.jpg')} style={{ flex: 1, width:'100%' ,  marginTop:10, backgroundColor: 'white'}} resizeMode="contain"></Image>
                <View style={{flex: 1,paddingTop:10}}>

                    <View style={{flex: 2, flexDirection: 'row', marginBottom:10}}>
                        <Text style={{fontSize: 16, width: '10%'}}>Tên:</Text>
                        <Text style={{fontSize: 16, marginLeft: 10, marginRight: 10, width: '90%'}}>{book.name}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom:10}}>
                        <Text style={{fontSize: 16, }}>Tác giả:</Text>
                        <Text style={{fontSize: 16 , marginLeft: 10, marginRight: 10}}>{book.author}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom:10}}>
                        <Text style={{fontSize: 16, }}>Giá:</Text>
                        <Text style={{fontSize: 16, marginLeft: 10, marginRight: 10}}>{formatCurrency(book.price)}</Text>
                    </View>
                    <View style={{flex: 4, flexDirection: 'row', marginBottom:10}}>
                        <Text style={{fontSize: 16, }}>Mô tả:</Text>
                        <Text style={{fontSize: 16, marginLeft: 10, marginRight: 10}} numberOfLines={3} ellipsizeMode="tail">{book.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {addBookToCart(book); navigation.navigate('Homepage')}} style={{backgroundColor: 'white',flex: 1, borderWidth: 1, borderColor: 'darkgrey', alignItems: 'center', paddingVertical: 10}}>
                        <Text style={{fontSize: 16}}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default BookDetail