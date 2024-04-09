/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    updateBook: (state, action) => {
      const updatedBook = action.payload;
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = updatedBook;
      }
    },
    removeBook: (state, action) => {
      const bookIdToRemove = action.payload;
      state.books = state.books.filter(book => book.id !== bookIdToRemove);
    },
  },
});

export const { setBooks, updateBook, removeBook } = bookSlice.actions;

export const selectBooks = (state) => state.books.books;

export default bookSlice.reducer;
