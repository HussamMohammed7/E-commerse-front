import { createSlice } from '@reduxjs/toolkit';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type UserState = {
  users: User[];
  user: User | null; // Store the logged-in user
  error: null | string;
  isLoading: boolean;
};

const initialState: UserState = {
  users: [],
  user: null, // Initialize user as null
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.isLoading = true;
    },
    usersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    addUser: (state, action: { payload: { user: User } }) => {
      state.users = [action.payload.user, ...state.users];
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.userId);
      state.users = filteredUsers;
    },
    updateUser: (state, action) => {
      const { userId, updatedUser } = action.payload;
      const userToUpdate = state.users.find((user) => user.id === userId);
      if (userToUpdate) {
        Object.assign(userToUpdate, updatedUser);
      }
    },
    loginUser: (state, action: { payload: { user: User } }) => {
      state.user = action.payload.user; // Set the logged-in user
    },setUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload.role;
      }
    },

  },
});

export const {
  removeUser,
  addUser,
  usersRequest,
  usersSuccess,
  updateUser,
  loginUser, 
  setUserRole,
} = userSlice.actions;

export default userSlice.reducer;
