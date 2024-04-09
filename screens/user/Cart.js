/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import {useSelector} from 'react-redux';
import { selectCart } from '../../slices/cartSlice';

const Cart = () => {
    const cart = useSelector(selectCart);
    return (
        <View>
            {cart.length !== 0 ? <Text style={{textAlign:'center'}}>Cart</Text> : <Text style={{textAlign:'center'}}>khong co san pham trong gio hang</Text>}
        </View>
    );
};

export default Cart;
