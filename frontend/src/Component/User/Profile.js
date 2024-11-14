import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { useUser } from '../../UserContext'
import { PiUserCircle } from 'react-icons/pi'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies'
import CardProduct from '../CardProduct.mjs'
import CardMyProduct from '../Product/CardMyProduct'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [products, setProducts] = useState()
  const { user, setUser } = useUser()
  const user_id = user.user_id
  const navigate = useNavigate()

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
        console.log(error)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    navigate('/')
  }

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
        navigate('/')
      })
      .catch((error) => {
        console.error('Error in handleDelete:', error)
        alert('Failed to delete user')
      })
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="px-16 py-8">
        <div>
          <div className='font-semibold text-md mb-2'>Your Profile</div>
            <div className="flex w-full justify-evenly border border-spacing-1 border-slate-400 rounded-xl">
              <div className="flex flex-col items-center">
                <PiUserCircle className="text-9xl text-gray-800 mb-5" />
                <button
                  onClick={handleLogout}
                  className="bg-[#1E1E1E] text-[#FFFFFF] text-sm rounded-xl font-normal px-4 py-2 text-center border border-spacing-4 mb-5"
                >
                  Logout
                </button>
                <button
                  className="bg-[#D9534F] text-[#FFFFFF] text-sm rounded-xl font-normal px-4 py-2 text-center border border-spacing-4 mb-5"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>

              <div className='flex flex-col justify-center items-start gap-4'>
                <div>
                  <div className='text-xs font-light italic'>Full Name</div>
                  <div className='text-lg'>{user.name}</div>
                </div>

                <div>
                  <div className='text-xs font-light italic'>Email</div>
                  <div className='text-lg'>{user.email}</div>
                </div>

                <div>
                  <div className='text-xs font-light italic'>WhatsApp Number</div>
                  <div className='text-lg'>{user.no_wa}</div>
                </div>

                <Link to={'/edit-profile'}>
                  <button className="flex justify-center w-full bg-[#195319] text-[#FFFFFF] text-sm rounded-xl px-4 py-2 text-cente">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </div>
      

      <div className="px-16 py-8">
        <div className='text-lg font-semibold mb-2'>My Product</div>
        <div className="border border-slate-400 rounded-xl text-left">
          {products ? (
            products.map((product) => (
              <CardMyProduct key={product.id} data={product} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
