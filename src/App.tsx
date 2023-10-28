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

function App() {
  return (
    <div >
      {/* <h1>Vite + React + Toolkit + Tailwind</h1> */}
      <NavBar/>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="products" element={ <Products/> } />
        <Route path="AboutUs" element={ <AboutUs/> } />
        <Route path="ProductsManager" element={ <ProductsManager/> } />
        <Route path="Cart" element={ <Cart/> } />


        <Route path="Admin" element={ <Admin/> } />
        <Route path="Admin/AdminProduct" element={ <AdminProduct/> } />
        <Route path="Admin/AdminUsers" element={ <AdminUsers/> } />



        <Route path="products/ProductDetail/:productId" element={<ProductDetail />} />

        
      </Routes>
    </div>
  )
}

export default App
