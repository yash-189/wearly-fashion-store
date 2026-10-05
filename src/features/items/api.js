import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = process.env.REACT_APP_API_URL || "https://dummyjson.com";

const FASHION_CATEGORIES = [
  "womens-dresses",
  "tops",
  "mens-shirts",
  "womens-bags",
  "womens-shoes",
  "mens-shoes",
  "sunglasses",
  "womens-watches",
  "mens-watches",
  "womens-jewellery",
];

const toItem = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail,
  images: p.images ?? [p.thumbnail],
  brand: p.brand,
  stock: p.stock,
  shipping: p.shippingInformation,
  returns: p.returnPolicy,
  warranty: p.warrantyInformation,
  reviews: p.reviews ?? [],
  rate: p.rating,
  rating: { rate: p.rating, count: p.stock },
});

export const fetchitems = createAsyncThunk(
  "items/fetchitems",
  async (_, { rejectWithValue }) => {
    try {
      const responses = await Promise.all(
        FASHION_CATEGORIES.map((c) => axios.get(`${api}/products/category/${c}`))
      );
      return responses.flatMap((r) => r.data.products).map(toItem);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleItem = createAsyncThunk(
  "items/fetchSingleItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/products/${itemId}`);
      return toItem(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "items/fetchCategory",
  async () => FASHION_CATEGORIES
);

export const fetchByCategory = createAsyncThunk(
  "items/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/products/category/${category}`);
      return response.data.products.map(toItem);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
