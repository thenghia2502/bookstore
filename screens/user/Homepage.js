/* eslint-disable prettier/prettier */
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, selectBooks } from '../../slices/bookSlice';
import { selectCategories, setCategories } from '../../slices/categorySlice';
import { selectCart, setCart } from '../../slices/cartSlice';
const Homepage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
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
        const response = await axios.get('http://192.168.43.226:8080/api/client/book/getAll', config);
        dispatch(setBooks(response.data.data));
      } catch (error) {
        console.error('Error getting books:', error);
      }
    };
    // Gọi hàm getBook() ngay khi component được tạo
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
        const response = await axios.get('http://192.168.43.226:8080/api/client/categories', config);
        dispatch(setCategories(response.data));
        console.log('cate: ', response.data);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    // Gọi hàm getBook() ngay khi component được tạo
    getCategories();
  }, [userData, dispatch]);
  useEffect(() => {
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
  const addBookToCart = (book) => {
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      // Nếu sách đã tồn tại, tăng số lượng lên 1
      const updatedCart = cart.map(item => {
        if (item.id === book.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      dispatch(setCart(updatedCart));
    } else {
      // Nếu sách chưa tồn tại, thêm mới vào giỏ hàng với số lượng là 1
      dispatch.apply(setCart([...cart, { ...book, quantity: 1 }]));
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Tìm kiếm" style={styles.searchInput} value={namebookfind} onChangeText={setNameBookFind}/>
        <TouchableOpacity
                onPress={findbook}>
                <Image source={require('../../assets/magnifying-glass-backup-svgrepo-com.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Cart')}>

          <Image source={require('../../assets/shopping-cart-solid-svgrepo-com.png')} style={styles.icon} />
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
          // Hiển thị 2 cột
          renderItem={({ item }) => (
            <View key={item.id} style={[styles.bookbox]} >
              <Image source={require('../../assets/yeu-di-dung-so_128823_1.jpg')} style={styles.image} resizeMode="contain" />
              <View style={styles.bookInfo}>
                <Text>{item.name}</Text>
                <Text>{item.author}</Text>
                <Text>{item.price}</Text>
              </View>
              <TouchableOpacity onPress={()=> addBookToCart(item)}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
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
    width: '50%',
    marginRight: 10,
    marginLeft: 10,
  },
  bookInfo: {
    flex: 1,
  },
});
export default Homepage;
