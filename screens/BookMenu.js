/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BookMenu = ({ book, onUpdatePress , onDeletePress}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleUpdate = () => {
    // Gọi hàm onUpdatePress để chuyển đến màn hình cập nhật sách
    onUpdatePress(book);
  };

  const handleDelete = () => {
    // Thực hiện chức năng xóa cuốn sách
    onDeletePress(book);
    console.log('Delete book:', book);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggleMenu}>
        <Text>...</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleUpdate}>
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BookMenu;
