/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, selectBooks } from '../../slices/bookSlice';
import axios from 'axios';
const AddBook = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const currentBooks = useSelector(selectBooks);
    const [newName, setNewName] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCategories, setNewCategories] = useState([]);
    const addbook = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'application/json',
            },
          };
          const addBookData = JSON.stringify({
            name: newName,
            author: newAuthor,
            price: newPrice,
            description: newDescription,
        });
        try {
            const response = await axios.post('http://192.168.43.226:8080/api/admin/book/add', addBookData, config);
            if (response.data.status === 201) {
                const updatedBooks = [...currentBooks, response.data.data];
                dispatch(setBooks(updatedBooks));
                Alert.alert('Success', 'Book added successfully!');
                navigate('AdminHomepage');
            }
        } catch (error) {
            console.error('Error add book:', error);
        }
    }
    const {navigation, route} = props;
    const {navigate, goBack} = navigation;
    return (
    <View>
        <Text style={{textAlign:'center'}}>--ADD BOOK--</Text>
        <View>
        <Text>Name:</Text>
        <TextInput value={newName} placeholder="Name" onChangeText={setNewName}/>
    </View>
    <View>
        <Text>Author:</Text>
        <TextInput value={newAuthor} placeholder="Author" onChangeText={setNewAuthor}/>
    </View>
    <View>
        <Text>Price:</Text>
        <TextInput value={newPrice.toString()} placeholder="Price" onChangeText={setNewPrice}/>
    </View>
    <View>
        <Text>Description:</Text>
        <TextInput value={newDescription} placeholder="Description" onChangeText={setNewDescription}/>
    </View>
    <TouchableOpacity onPress={addbook}>
        <Text style={{textAlign:'center'}}>Add Book</Text>
    </TouchableOpacity>
    </View>);
};

export default AddBook;
