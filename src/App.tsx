import { ProductsManager } from './components/ProductsManager'
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
import { NewProductWrapper } from './components/NewProductWrapper'
import Profile from './components/Profile'

function App() {
  return (
    <div >
      {/* <h1>Vite + React + Toolkit + Tailwind</h1> */}
      <NavBar/>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="products" element={ <Products/> } />
        <Route path="about-us" element={ <AboutUs/> } />
        <Route path="products-manager" element={ <ProductsManager/> } />
        <Route path="cart" element={ <Cart/> } />

        <Route path="login" element={ <Login/> } />
        <Route path="/login/register" element={ <Register/> } />
        <Route path="profile" element={ <Profile/> } />






        <Route path="admin" element={ <Admin/> } />
        <Route path="admin/admin-product" element={ <AdminProduct/> } />
        <Route path="admin/admin-product/new-product" element={ <NewProductWrapper/> } />

        <Route path="admin/admin-users" element={ <AdminUsers/> } />
        <Route path="admin/admin-order" element={ <AdminOrder/> } />
        


        



        <Route path="products/product-detail/:productId" element={<ProductDetail />} />

        
      </Routes>
    </div>
  )
}

export default App
