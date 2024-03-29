import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import AboutUs from './components/AboutUs'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Admin from './AdminPage/Admin'
import AdminProduct from './AdminPage/AdminProduct'
import AdminUsers from './AdminPage/AdminUsers'
import Login from './Login&Register/Login'
import Register from './Login&Register/Register'
import AdminOrder from './AdminPage/AdminOrder'
import Profile from './Profile/Profile'
import ProfileOrder from './Profile/ProfileOrder'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminCategory from './AdminPage/AdminCategory'
import ForgotPassword from './Login&Register/ForgotPassword'
import ResetEmail from './Login&Register/ResetEmail'

function App() {
  return (
    <div >
      {/* <h1>Vite + React + Toolkit + Tailwind</h1> */}
      <ToastContainer/>

      <NavBar/>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="products" element={ <Products/> } />
        <Route path="about-us" element={ <AboutUs/> } />
        <Route path="cart" element={ <Cart/> } />

        <Route path="login" element={ <Login/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="profile" element={ <Profile/> } />
        <Route path="profile/profile-order" element={ <ProfileOrder/> } />







        <Route path="admin" element={ <Admin/> } />
        <Route path="admin/admin-product" element={ <AdminProduct/> } />

        <Route path="admin/admin-users" element={ <AdminUsers/> } />
        <Route path="admin/admin-order" element={ <AdminOrder/> } />
        <Route path="admin/admin-categories" element={ <AdminCategory/> } />

        

        <Route path="products/product-detail/:productId" element={<ProductDetail />} />
        <Route path="forgot-password/:forgotPasswordToken" element={<ForgotPassword />} />
        <Route path="reset-email/" element={<ResetEmail />} />



        
      </Routes>
    </div>
  )
}

export default App
