import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'
import { User } from '../redux/slices/userSlice'

interface UserDecoded {
  _id: String
  email: string
  role: string
}

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)

    if (isDecodedUser(decodedUser)) {
      const user: UserDecoded = {
        email: decodedUser.email,
        _id: decodedUser._id,
        role: decodedUser.role
      }
      console.log(user)
      return user
    }
    return null
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
export function setTokenToStorage(token: string): void {
  localStorage.setItem('token', token)
}
