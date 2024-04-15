/* eslint-disable prettier/prettier */
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, selectBooks, removeBook } from '../../slices/bookSlice';
import { selectCategories, setCategories } from '../../slices/categorySlice';
import BookMenu from '../BookMenu';
import { selectUserData } from '../../slices/userSlice';
const AdminHomepage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const books = useSelector(selectBooks);
  const [data, setData] = useState([]);
  const [namebookfind, setNameBookFind] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const cates = useSelector(selectCategories);
  const [arrcate, setArrcate] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      try {
        const response = await axios.get('http://192.168.43.226:8080/api/admin/book/getAll', config);
        dispatch(setBooks(response.data.data));
      } catch (error) {
        console.error('Error getting books:', error);
      }
    };
    getBook();
  }, [userData, dispatch]);
  useEffect(() => {
    const getCategories = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      try {
        const response = await axios.get('http://192.168.43.226:8080/api/admin/categories', config);
        dispatch(setCategories(response.data.data));
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    getCategories();
  }, [userData, dispatch]);
  useEffect(() => {
    setData(books);
    setFilteredData(books);
    setArrcate(cates);
  }, [books, cates]);
  const findbook = () => {
    if (namebookfind === '') {
      setFilteredData(data);
    } else {
      const filteredBooks = data.filter(book => book.name.toLowerCase().includes(namebookfind.toLowerCase()));
      setFilteredData(filteredBooks);
    }
  };
  const handleUpdatePress = (book) => {
    navigate('UpdateBook', { bookToUpdate: book });
  };
  const handleDeletePress = (book) => {
    // Hiển thị hộp thoại xác nhận
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this book?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteBook(book),
          style: 'destructive',
        },
      ],
      { cancelable: false } // Ngăn người dùng đóng hộp thoại bằng cách nhấn bên ngoài
    );
  };
  const deleteBook = async (book) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      console.log('book.id: ', book.id);
      const response = await axios.delete(`http://192.168.43.226:8080/api/admin/book/delete/${book.id}`, config);
      console.log(response.data);
      if (response.data.status === 200) {
        dispatch(removeBook(book.id));
      }
      Alert.alert('Success', 'Book deleted successfully!');
    } catch (error) {
      console.error('Error delete books:', error);
    }
  };
  const findbookCate = (cate) => {
    const filteredBooks = data.filter(book => book.categories.includes(cate));
    setFilteredData(filteredBooks);
  };
  const onSelectCategory = (category) => {
    findbookCate(category.name);
  };
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  return (<View style={{ flex: 1 }}>
    <View style={styles.searchContainer}>
      <TextInput placeholder="Tìm kiếm" style={styles.searchInput} value={namebookfind} onChangeText={setNameBookFind} />
      <TouchableOpacity
        onPress={findbook}>
        <Image source={require('../../assets/magnifying-glass-backup-svgrepo-com.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
    <View style={styles.categoriesContainer}>
      <FlatList
        data={arrcate}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.categoriesID} onPress={() => onSelectCategory(item)}>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.categoriesID}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </View>
    <View style={styles.bookContainer}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={[styles.bookbox]} >
            <Image source={require('../../assets/yeu-di-dung-so_128823_1.jpg')} style={styles.image} resizeMode="contain" />
            <View style={styles.bookInfo}>
              <Text>{item.name}</Text>
              <Text>{item.author}</Text>
              <Text>{item.price}</Text>
            </View>
            <BookMenu book={item} onUpdatePress={handleUpdatePress} onDeletePress={handleDeletePress} />
          </View>
        )}
      />
    </View>
  </View>);
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
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
  },
  bookbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
  bookInfo: {
    flex: 1,
  },
});
export default AdminHomepage;
