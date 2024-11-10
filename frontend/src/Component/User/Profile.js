import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { useUser } from '../../UserContext'
import { PiUserCircle } from 'react-icons/pi'
import CardMyProduct from '../Product/CardMyProduct'

const Profile = () => {
  const [products, setProducts] = useState(null) // Initial state is null for loading
  const { user } = useUser()
  const user_id = user.user_id
  const navigate = useNavigate() // Added for navigation after deleting user

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${user_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [user_id]) // Added dependency on user_id to refetch if it changes

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/user/${user_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete user')
        }
        return response.text()
      })
      .then((message) => {
        console.log(message)
        alert('User deleted successfully!')
        navigate('/') // Redirect to home after deletion
      })
      .catch((error) => {
        console.error('Error in handleDelete:', error)
        alert('Failed to delete user')
      })
  }

  return (
    <div className="">
      <Navbar />

      <div className="px-16 py-8 text-[#195319] font-semibold text-2xl">
        <div className="mb-5">Your Profile!</div>
        <div className="flex w-full gap-16 border border-spacing-1 border-slate-400 rounded-xl">
          {/* Left Section (User Icon and Buttons) */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ flex: 4 }}
          >
            <PiUserCircle className="text-9xl mb-10 text-[#838383]" />{' '}
            {/* Increase icon size */}
            <div className="flex flex-col gap-2">
              <button className="bg-[#1E1E1E] text-[#FFFFFF] rounded-xl font-normal px-4 py-1 text-sm text-center">
                Log Out
              </button>

              {/* Delete Account button */}
              <button
                onClick={handleDelete}
                className="bg-[#D9534F] text-[#FFFFFF] rounded-xl px-4 py-1 text-sm"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Right Section (User Info) */}
          <div className="flex flex-col w-full" style={{ flex: 6 }}>
            <div className="text-[#195319] font-semibold mb-3 mt-5">
              Personal Info
            </div>
            <div className="text-[#838383] text-xs font-normal mb-3">
              <p>Full Name</p>
              <div
                className="h-7 border border-slate-400 rounded-xl mb-3 flex items-center justify-between mr-10"
                style={{ minWidth: '200px' }}
              >
                <div>{user.name}</div>
              </div>
            </div>

            <div className="text-[#838383] text-xs font-normal mb-3">
              <p>Email Address</p>
              <div
                className="h-7 border border-slate-400 rounded-xl mb-3 flex items-center justify-between mr-10"
                style={{ minWidth: '200px' }}
              >
                <div>{user.email}</div>
              </div>
            </div>

            <div className="text-[#838383] text-xs font-normal mb-5">
              <p>WhatsApp Number</p>
              <div
                className="h-7 border border-slate-400 rounded-xl mb-3 flex items-center justify-between mr-10"
                style={{ minWidth: '200px' }}
              >
                <div>{user.no_wa}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-16 py-1">
        <div className="flex justify-between w-full">
          <div></div> {/* Empty div for spacing on the left */}
          <Link to={'/edit-profile'}>
            <button className="bg-[#195319] text-[#FFFFFF] rounded-xl px-5 py-1">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>

      <div className="px-16 pb-16 text-[#195319] font-semibold text-2xl">
        <div>Katalog Produk</div>
        <div className="border border-slate-400 rounded-xl text-left">
          <div>Search In Product</div>
          <div className="border border-slate-400 rounded-xl"></div>
          {products === null ? (
            <div>Loading...</div> // Show a loading state when products is null
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardMyProduct key={product.id} data={product} />
            ))
          ) : (
            <div>No products available</div> // Message when there are no products
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
