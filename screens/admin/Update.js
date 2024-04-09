/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../../slices/bookSlice';
import axios from 'axios';
const UpdateBook = (props) => {
    const { navigation, route } = props;
    const { naviagte, goBack} = navigation;
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const { bookToUpdate } = route.params;
    const { id, name, author, price, description, categories } = bookToUpdate;
    const [newName, setNewName] = useState(name);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState( description);
    const [newCategories, setNewCategories] = useState(categories);

    const updatebook = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'application/json',
            },
          };
          const updatedBookData = JSON.stringify({
            id: id, // ID của sách cần cập nhật
            name: newName, // Tên mới của sách
            author: newAuthor, // Tác giả mới của sách
            price: newPrice, // Giá mới của sách
            description: newDescription, // Mô tả mới của sách
            categories: newCategories, // Danh mục mới của sách
        });
        try {
            const response = await axios.patch(`http://192.168.43.226:8080/api/admin/book/update/${id}`, updatedBookData,config);
            dispatch(updateBook(response.data.data));
            Alert.alert('Success', 'Book updated successfully!');
            goBack();
        } catch (error) {
            console.error('Error update books:', error);
        }
    };
    return <View>
        <Text style={{textAlign:'center'}}>--UPDATE BOOK--</Text>
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
    <View>
        <Text>Categories:</Text>
        <FlatList
            data={newCategories}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
    <TouchableOpacity onPress={updatebook}>
        <Text style={{textAlign:'center'}}>Update</Text>
    </TouchableOpacity>
</View>;
};
export default UpdateBook;
