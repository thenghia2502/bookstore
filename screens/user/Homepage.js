/* eslint-disable prettier/prettier */
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, selectBooks } from '../../slices/bookSlice';
import { selectCategories, setCategories } from '../../slices/categorySlice';
import { selectCart, setCart } from '../../slices/cartSlice';
import { selectUserData } from '../../slices/userSlice';
import { formatCurrency } from '../../utils';
const Homepage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const books = useSelector(selectBooks);
  const cart = useSelector(selectCart);
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
        const response = await axios.get(`http://192.168.43.226:8080/api/client/book/getAll`, config);
        dispatch(setBooks(response.data.data));
      } catch (error) {
        console.error('Error getting books:', error);
      }
    };
    // Gọi hàm getBook() ngay khi component được tạo
    getBook();
    const getCart = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      try {
        const response = await axios.get('http://192.168.43.226:8080/api/client/cart/getAll', config);
        dispatch(setCart(response.data.data));
      } catch (error) {
        console.error('Error getting cart:', error);
      }
    };
    getCart();
    const getCategories = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      try {
        const response = await axios.get('http://192.168.43.226:8080/api/client/categories', config);
        dispatch(setCategories(response.data));
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    getCategories();
  }, [userData, dispatch]);
  useEffect(() => {
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
  const findbookCate = (cate) => {
    const filteredBooks = data.filter(book => book.categories.includes(cate));
    setFilteredData(filteredBooks);
  };
  const onSelectCategory = (category) => {
    // Thực hiện công việc khi chọn một category
    findbookCate(category.name);
    console.log('Selected category:', category);
  };
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
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
  const handlebook = (book) => {
    navigate('BookDetail', { book: book });
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#E0E8F6' }}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Tìm kiếm" style={styles.searchInput} value={namebookfind} onChangeText={setNameBookFind} />
        <TouchableOpacity
          onPress={findbook}>
          <Image source={require('../../assets/magnifying-glass-backup-svgrepo-com.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10}} onPress={() => navigate('Cart')}>

          <Image source={require('../../assets/shopping-cart-solid-svgrepo-com.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Account')}>
          <Image source={require('../../assets/user.png')} style={styles.icon} ></Image>
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
          numColumns={2} // Đặt số cột thành 2
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=> handlebook(item)} key={item.id} style={[styles.bookbox, { marginLeft: index % 2 === 0 ? 10 : 5, marginRight: index % 2 === 0 ? 5 : 10, marginTop: index === 0 || index === 1 ? 0 : 5, marginBottom: 5 }]} >
              <Image source={require('../../assets/yeu-di-dung-so_128823_1.jpg')} style={styles.image} resizeMode="contain" />
              <View style={styles.bookInfo}>
                <Text style={{ marginBottom: 3, }}>{item.name}</Text>
                <Text style={{ marginBottom: 6, }}>{item.author}</Text>
                <Text >{formatCurrency(item.price)}</Text>
              </View>
              <TouchableOpacity onPress={() => addBookToCart(item)} style={{ backgroundColor: 'white', width: '100%' }}>
                <Text style={{ backgroundColor: 'white', width: '100%', textAlign: 'center', paddingVertical:10 }}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
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
    // marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  bookContainer: {
    flex: 9,
    paddingBottom: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bookbox: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  bookInfo: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%',
  },
});
export default Homepage;
