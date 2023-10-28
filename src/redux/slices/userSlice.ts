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
  error: null | string;
  isLoading: boolean;
};

const initialState: UserState = {
  users: [],
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
      // Append the new user to the beginning of the array
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
          // Update the user details with the provided data
          Object.assign(userToUpdate, updatedUser);
        }
      },
    
  },
});


export const { removeUser, addUser, usersRequest, usersSuccess ,updateUser} = userSlice.actions;

export default userSlice.reducer;
