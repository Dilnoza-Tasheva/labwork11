import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Item, ItemMutation } from "../../types";
import { RootState } from '../../app/store.ts';

export const fetchItems = createAsyncThunk<Item[], string | undefined>(
  "items/fetchItems",
  async (category) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const response = await axiosApi.get<Item[]>(`/items${query}`);
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk<Item, string>(
  "items/fetchItemById",
  async (id) => {
    const response = await axiosApi.get<Item>(`/items/${id}`);
    return response.data;
  }
);

export const createItem = createAsyncThunk<void, ItemMutation>(
  "items/createItem",
  async (itemMutation, { getState }) => {
    const state = getState() as RootState;

    const token = state.users.user?.token;

    if (!token) {
      throw new Error("No token available. Please log in to perform this action.");
    }

    const formData = new FormData();
    const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];
    keys.forEach((key) => {
      const value = itemMutation[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    await axiosApi.post("/items", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);


export const deleteItem = createAsyncThunk<string, string>(
  "items/deleteItem",
  async (id) => {
    await axiosApi.delete(`/items/${id}`);
    return id;
  }
);
