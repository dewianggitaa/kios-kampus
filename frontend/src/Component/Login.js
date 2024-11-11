import React, { useState } from 'react'
import image from '../assets/image-masuk.jpg'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = new useNavigate()
  const { setUser } = useUser()

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: email,
      password: password,
    }
    fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user)
        setUser(data.user)
        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-screen h-screen">
      <img src={image} className="w-full md:w-1/2 lg:w-1/2 h-1/3 md:h-screen object-cover" />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-center mb-10 text-2xl md:text-3xl lg:text-4xl font-semibold">Welcome Back!</h1>
        <p className='text-sm'>Enter your email and password to continue</p>
        <div className="flex bg-[#EAECEB] w-fit gap-5 rounded-xl p-1 mb-5">
          <div className="p-2 cursor-pointer rounded-l-xl w-25 text-center">
            Sign In
          </div>
          <div className="p-2 cursor-pointer rounded-r-xl w-25 text-center ">
            Sign Up
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 mb-3">
          <p>Email</p>
          <input
            className="w-full h-10 border border-slate-400 rounded-md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <p>Password</p>
          <input
            className="w-full h-10 border border-slate-400 rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <p className="text-right text-xs text-[#518D4F] mb-7">
            Forget Password?
          </p>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-800 text-white rounded-lg px-5 py-1 font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
