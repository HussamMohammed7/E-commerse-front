import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../api';

export type Category = {
  _id: string;
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
export const getCategoriesThunk = createAsyncThunk('categories/get', async () => {
  try {
    const res = await api.get('/api/categories');
    return res.data.categories;
  } catch (error) {
    console.error('getCategoriesThunk error:', error);
    throw error;
  }
});

export const addCategoryThunk = createAsyncThunk('categories/add', async (category: Category) => {
  try {
    const res = await api.post('/api/categories', category);
    return res.data.category;
  } catch (error) {
    console.error('addCategoryThunk error:', error);
    throw error;
  }
});

export const deleteCategoryThunk = createAsyncThunk('categories/delete', async (categoryId: string) => {
  try {
    await api.delete(`/api/categories/${categoryId}`);
    return categoryId;
  } catch (error) {
    console.error('deleteCategoryThunk error:', error);
    throw error;
  }
});
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
    removeCategory: (state, action: { payload: { categoryId: string } }) => {
      const filteredItems = state.items.filter(
        (category) => category._id !== action.payload.categoryId
      );
      state.items = filteredItems;
    },
    updateCategory: (state, action) => {
      const { categoryId, updatedCategory } = action.payload;
      const categoryToUpdate = state.items.find(
        (category) => category._id === categoryId
      );
      if (categoryToUpdate) {
        // Update the category details with the provided data
        Object.assign(categoryToUpdate, updatedCategory);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const categoryId = action.payload;
      state.items = state.items.filter((category) => category._id !== categoryId);
    });
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
