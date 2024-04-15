/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../slices/cartSlice';
import { setCart } from '../../slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../utils';
const Cart = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const cart = useSelector(selectCart);
    const [items, setItems] = useState(cart);
    const [totalAmount, setTotalAmount] = useState()
    const navigation = useNavigation();
    useEffect(() => {
        let sumAmount = 0;

        for (const item of cart) {
            const { book, quantity } = item;
            const price = book.price;
            const subtotal = price * quantity;
            sumAmount += subtotal;
        }
        setTotalAmount(sumAmount);
    }, [cart]);
    useEffect(() => {
        setItems(cart);
    }, [cart]);
    const handleUp = async (book) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        };
        try {
            await axios.post(`http://192.168.43.226:8080/api/client/cart/add/${book.id}`, config);
            const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
            dispatch(setCart(response.data.data));
        } catch (error) {
            console.error('Error getting cart:', error);
        }
    };
    const handleDown = async (item) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        };
        if (item.quantity === 1) {
            try {
                await axios.post(`http://192.168.43.226:8080/api/client/cart/delete/${item.book.id}`, config);
                const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
                dispatch(setCart(response.data.data));
            } catch (error) {
                console.error('Error delete item cart:', error);
            }
        } else {
            try {
                await axios.post(`http://192.168.43.226:8080/api/client/cart/uppdate/${item.book.id}/${item.quantity - 1}`, config);
                const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
                dispatch(setCart(response.data.data));
            } catch (error) {
                console.error('Error update item cart:', error);
            }
        }
    };
    const handleDelete = async (book) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        };
        try {
            await axios.post(`http://192.168.43.226:8080/api/client/cart/delete/${book.id}`, config);
            const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
            dispatch(setCart(response.data.data));
        } catch (error) {
            console.error('Error delete item cart:', error);
        }
    };
    return (
        <View style={{ flex: 1 , backgroundColor: '#E0E8F6'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', marginBottom:3}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Homepage')}>

                    <Image source={require('../../assets/left-arrow-svgrepo-com.png')} style={{ height: 30, width: 30, }}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20}}>Giỏ hàng</Text>
            </View>
            {cart.length !== 0 ? <View style={{ position: 'sticky', backgroundColor: 'white', width: '100%' ,flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{width: '30%', fontSize: 20}}>Tổng tiền: </Text>
                <Text style={{width: '40%', fontSize: 20}}>{formatCurrency(totalAmount)}</Text>
                <TouchableOpacity style={{width: '30%', backgroundColor: 'orange', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>Thanh toán</Text>
                </TouchableOpacity>
            </View> : <Text style={{ textAlign: 'center' ,flex:1, textAlignVertical: 'center'}}>Không có gì trong giỏ hàng</Text>}

            {cart.length !== 0 ? <View style={styles.bookContainer}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.book.id}
                    renderItem={({ item }) => (
                        <View key={item.book.id} style={[styles.bookbox]} >
                            <Image source={require('../../assets/yeu-di-dung-so_128823_1.jpg')} style={styles.image} resizeMode="contain" />
                            <View style={styles.bookInfo}>
                                <Text style={{paddingBottom: 3}}>{item.book.name}</Text>
                                <Text style={{paddingBottom: 6}}>{item.book.author}</Text>
                                <Text>{formatCurrency(item.book.price)}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontWeight: 500 }}>

                                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'darkgrey', justifyContent: 'center', alignItems: 'center' }} onPress={() => handleDown(item)}>
                                        <Text >-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ flex: 2, borderWidth: 1, borderColor: 'darkgrey', textAlign: 'center' }}>{item.quantity}</Text>
                                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'darkgrey', justifyContent: 'center', alignItems: 'center' }} onPress={() => handleUp(item.book)}>
                                        <Text >+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleDelete(item.book)}>
                                        <Text style={{ borderWidth: 1, borderColor: 'darkgrey', width: 50, textAlign: 'center' }}>x</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View> : <Text style={{ textAlign: 'center' }}></Text>}
        </View>
    );
};
const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    categoryList: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    categoryItem: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookContainer: {
        flex: 15,
        paddingHorizontal: 10,
        backgroundColor: '#E0E8F6',
    },
    categoriesContainer: {
        paddingHorizontal: 10,
    },
    bookbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
        marginTop: 10,
    },
    image: {
        flex: 1,
    },
    bookInfo: {
        flex: 2,
        marginHorizontal: 10,
        marginVertical: 10,
    },
});
export default Cart;
