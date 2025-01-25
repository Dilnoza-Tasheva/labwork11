import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Item, ItemMutation } from "../../types";

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
  async (itemMutation) => {
    const formData = new FormData();

    const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];

    keys.forEach((key) => {
      const value = itemMutation[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    await axiosApi.post("/items", formData);
  }
);

export const deleteItem = createAsyncThunk<string, string>(
  "items/deleteItem",
  async (id) => {
    await axiosApi.delete(`/items/${id}`);
    return id;
  }
);
