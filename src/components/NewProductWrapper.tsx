import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { ProductForm } from '../AdminPage/AddProductForm'
import {  Product } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'

const initialProductState: Product = {
  _id: "",
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0,
}

export function NewProductWrapper() {

  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    console.log('product:', product)

    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div >
    </div>
  )
}
