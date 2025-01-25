import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Item } from "../../types";
import { createItem, deleteItem, fetchItemById, fetchItems } from './itemsThunks.ts';

interface IItemsState {
  items: Item[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  loading: boolean;
  itemDetails: Item | null;
}

const initialState: IItemsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  loading: false,
  itemDetails: null,
};

export const selectItems = (state: RootState) => state.items.items;
export const selectFetchLoading = (state: RootState) => state.items.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.items.createLoading;
export const selectDeleteLoading = (state: RootState) => state.items.deleteLoading;
export const selectItemDetails = (state: RootState) => state.items.itemDetails;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemById.fulfilled, (state, { payload: item }) => {
        state.loading = false;
        state.itemDetails = item;
      })
      .addCase(fetchItemById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createItem.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createItem.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(deleteItem.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, { payload: itemId }) => {
        state.deleteLoading = false;
        state.items = state.items.filter((item) => item._id !== itemId);
      })
      .addCase(deleteItem.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
