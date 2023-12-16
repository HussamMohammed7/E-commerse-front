import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5050/'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:3000/'
}

const api = axios.create({
  baseURL
})
const token = getTokenFromStorage()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
