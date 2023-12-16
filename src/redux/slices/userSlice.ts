import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api'
import { AxiosError } from 'axios'

export type DecodedUser = {
  role: Role
  email: string
  _id: string
}
export const ROLES = {
  VISITOR: 'visitor',
  ADMIN: 'admin'
}

type Role = 'visitor' | 'admin'
export type User = {
  _id: number
  first_name: string
  last_name: string
  email: string
  password: string
  role: Role
  isActive: boolean
  orders: Order[]
}
interface Order {
  _id: number
  productId: number
  userId: number
  purchasedAt: string
}
export type UserState = {
  users: User[]
  user: User | null // Store the logged-in user
  error: null | string
  isLoading: boolean
}

const initialState: UserState = {
  users: [],
  user: null, // Initialize user as null
  error: null,
  isLoading: false
}

export const loginThunk = createAsyncThunk(
  'user/login',
  // Declare the type your function argument here:
  async (userLogin: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(`http://localhost:5050/api/users/login`, userLogin)
      // Inferred return type: Promise<MyData>
      console.log(res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)
export const getUserOneThunk = createAsyncThunk(
  'user/getUserOne',
  // Declare the type your function argument here:
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`http://localhost:5050/api/users/${userId}`)
      // Inferred return type: Promise<MyData>
      console.log("res.data from getUserOne",res.data)
      
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    addUser: (state, action: { payload: { user: User } }) => {
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user._id !== action.payload.userId)
      state.users = filteredUsers
    },
    updateUser: (state, action) => {
      const { userId, updatedUser } = action.payload
      const userToUpdate = state.users.find((user) => user._id === userId)
      console.log(userToUpdate)
      if (userToUpdate) {
        Object.assign(userToUpdate, updatedUser)
      }
    }
    // loginUser: (state, action: { payload: { user: User } }) => {
    //   state.user = action.payload.user; // Set the logged-in user
    // },setUserRole: (state, action) => {
    //   if (state.user) {
    //     state.user.role = action.payload.role;
    //   }
  },

  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      console.log('pending')

      state.isLoading = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      console.log('rejected')
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false

      return state
    })
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log('fulfilled')
      state.user = action.payload.user // Set the logged-in user
      state.isLoading = false
      return state
    })
  
    builder.addCase(getUserOneThunk.fulfilled, (state, action) => {
      console.log('fulfilled')
      if (!state.user) {
        state.user = action.payload
      }
      console.log("getUserOne state",state.user)
      state.isLoading = false
      return state
    })








  }
})

export const { removeUser, addUser, usersRequest, usersSuccess, updateUser } = userSlice.actions

export default userSlice.reducer
