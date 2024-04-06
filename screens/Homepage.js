/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';

const Homepage = () => {
  const [book, setBook] = useState([]);
  const [cate, setCate] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('http://192.168.201.226:8090/api/client/book/getAll');
        setBook(response.data.data);
      } catch (error) {
        console.error('Error books:', error);
      }
    };
    const getCategories = async () => {
      try {
        const response = await axios.get('http://192.168.201.226:8090/api/client/categories');
        setCate(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getBooks();
    getCategories();
  }, []);
  const onSelectCategory = (category) => {
    // Thực hiện công việc khi chọn một category
    console.log('Selected category:', category);
  };

  // Lấy kích thước màn hình
  const { width } = Dimensions.get('window');
  // Tính kích thước của mỗi sản phẩm
  const itemWidth = (width - 30) / 2 - 20;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Tìm kiếm" style={styles.searchInput} />
        <Image source={require('../assets/magnifying-glass-backup-svgrepo-com.png')} style={styles.icon} />
        <Image source={require('../assets/shopping-cart-solid-svgrepo-com.png')} style={styles.icon} />
      </View>
      <View style={styles.categoriesContainer}>
      <FlatList
        data={cate}
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
          data={book}
          keyExtractor={(item) => item.id}
          numColumns={2} // Hiển thị 2 cột
          renderItem={({ item }) => (
            <View key={item.id} style={[styles.bookbox, { width: itemWidth }]} >
              <Image source={require('../assets/yeu-di-dung-so_128823_1.jpg')} style={styles.image} />
              <View style={styles.bookInfo}>
                <Text>{item.name}</Text>
                <Text>{item.author}</Text>
                <Text>{item.price}</Text>
              </View>
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
