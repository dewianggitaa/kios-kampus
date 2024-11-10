import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../Navbar'

const SellerProfile = () => {
  const location = useLocation()
  const [seller, setSeller] = useState(null)
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  console.log(id)

  useEffect(() => {
    const fetchingSellerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`)
        if (!response.ok) {
          throw new Error('Gagal mengambil data Penjual')
        }
        const data = await response.json()
        setSeller(data)

        const sellerProductResponse = await fetch(
          `http://localhost:5000/api/products/${id}`
        )
        if (!sellerProductResponse.ok) {
          throw new Error('Gagal mengambil produk Seller')
        }
        const productData = await sellerProductResponse.json()
        setProducts(productData)
      } catch (error) {
        setError(error.message)
        console.error('Terjadi kesalahan:', error)
      }
    }

    fetchingSellerData()
  }, [id])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!seller || !products) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-5">
        {/* Seller Information */}
        <div className="mb-6">
          <div className="text-2xl font-bold">{seller.name}</div>
          <div className="mt-3">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Chat Sekarang
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              to={`/product-detail?id=${product.product_id}`}
              key={product.product_id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row p-4">
                {/* Product Image Section (left side) */}
                <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Rp {product.price}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                </div>

                {/* Product Details Section (right side) */}
                <div className="w-full sm:w-2/3 pl-0 sm:pl-4">
                  {/* Product Title */}
                  <div className="font-semibold text-xl">{product.name}</div>

                  {/* Seller Profile, Description, Category */}
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Profil Penjual: {seller.name}</p>
                    <p className="mt-2">{product.description}</p>
                    <p className="mt-2 text-sm">Kategori: {product.category}</p>
                  </div>

                  {/* Chat Seller Button */}
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 w-full">
                      Chat Seller
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SellerProfile
