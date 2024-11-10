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

  const [activeButton, setActiveButton] = useState(null)

  const handleButtonClick = (button) => {
    setActiveButton(button)
  }

  return (
    <div className="flex w-screen">
      <img src={image} className="w-1/2 h-screen object-cover" />
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Welcome Back!</h1>
        <p className="mb-10 text-center">
          Enter your email and password to continue
        </p>
        <div className="flex bg-[#EAECEB] w-fit gap-5 rounded-xl p-1 mb-5">
          <div
            className={`p-2 cursor-pointer rounded-l-xl w-25 text-center ${
              activeButton === 'signIn' ? 'bg-white text-black' : ''
            }`}
            onClick={() => handleButtonClick('signIn')}
          >
            Sign In
          </div>
          <div
            className={`p-2 cursor-pointer rounded-r-xl w-25 text-center ${
              activeButton === 'signUp' ? 'bg-white text-black' : ''
            }`}
            onClick={() => handleButtonClick('signUp')}
          >
            Sign Up
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5">
          <div className="mb-3">
            <p>Email</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <p>Password</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <p className="text-right text-xs text-[#518D4F] mb-7">
            Forget Password?
          </p>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-800 text-white rounded-lg px-5 py-1 font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
