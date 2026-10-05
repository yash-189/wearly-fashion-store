import { createSlice } from '@reduxjs/toolkit';

import {  fetchByCategory, fetchCategory, fetchSingleItem, fetchitems } from './api';



const productSlice = createSlice({
  name: 'items',
  initialState: {
    productList:[],
    items: [],
    singleItem: null,
    categories: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    searchItem: (state, action) => {
      const searchQuery = action.payload.trim().toLowerCase();

      state.items = state.productList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery)
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchitems.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchitems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.productList = action.payload
        state.status = 'success';
      })
      .addCase(fetchitems.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
      .addCase(fetchSingleItem.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchSingleItem.fulfilled, (state, action) => {
        state.singleItem = action.payload;
        state.status = 'success';
      })
      .addCase(fetchSingleItem.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
      .addCase(fetchCategory.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
      .addCase(fetchByCategory.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
      
  },
});


export const { searchItem } = productSlice.actions;

export default productSlice.reducer;

export const selectItems = (state) => state.items.items;
export const selectSingleItem = (state) => state.items.singleItem;
export const selectItemStatus = (state) => state.items.status;
export const selectItemError = (state) => state.items.error;
export const selectCategories = (state) => state.items.categories;
export const selectProductList = (state) => state.items.productList;
