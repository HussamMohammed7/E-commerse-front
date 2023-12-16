import { DecodedUser } from '../redux/slices/userSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'email' in obj &&
    'role' in obj &&
    '_id' in obj
  )
}
