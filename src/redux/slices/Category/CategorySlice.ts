import { createSlice } from '@reduxjs/toolkit';

export type Category = {
  id: number;
  name: string;
};

export type CategoryState = {
  items: Category[];
  error: null | string;
  isLoading: boolean;
};

const initialCategoryState: CategoryState = {
  items: [],
  error: null,
  isLoading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true;
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    addCategory: (state, action: { payload: { category: Category } }) => {
      // Append the new category to the beginning of the array
      state.items = [action.payload.category, ...state.items];
    },
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredItems = state.items.filter(
        (category) => category.id !== action.payload.categoryId
      );
      state.items = filteredItems;
    },
    updateCategory: (state, action) => {
      const { categoryId, updatedCategory } = action.payload;
      const categoryToUpdate = state.items.find(
        (category) => category.id === categoryId
      );
      if (categoryToUpdate) {
        // Update the category details with the provided data
        Object.assign(categoryToUpdate, updatedCategory);
      }
    },
  },
});

export const {
  removeCategory,
  addCategory,
  categoriesRequest,
  categoriesSuccess,
  updateCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
