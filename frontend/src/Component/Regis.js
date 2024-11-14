import { React, useState, useEffect } from 'react'
import image from '../assets/image-masuk.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Regis = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [no_wa, setNoWa] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      name: name,
      email: email,
      no_wa: no_wa,
      password: password,
    }
    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(userData),
    })
      .then((data) => {
        console.log('Success: ', data)
        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="flex flex-col  md:flex-row lg:flex-row w-screen h-screen">
      <img src={image} className="w-full md:w-1/2 lg:w-1/2 h-1/3 md:h-screen lg:h-screen object-cover" />
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center h-full">
        <h1 className="text-center mb-10 text-2xl md:text-3xl lg:text-4xl font-semibold">Get Started Now!</h1>
        <p className='text-sm'>Welcome! Please enter your detail</p>
        <div className="flex bg-[#EAECEB] w-fit rounded-xl p-1 mb-5">
          <Link to={"/"}>
            <div className="p-2 cursor-pointer rounded-l-xl hover:bg-white w-25 text-center">
              Sign In
            </div>
          </Link>
          
          <div className="p-2 bg-white cursor-pointer rounded-r-xl w-25 text-center">
            Sign Up
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 flex flex-col">
          <form>
            <p>Full Name</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md hover:border-amber-400"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <p>Email</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md hover:border-amber-400"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <p>WhatsApp Numbers</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md hover:border-amber-400"
              value={no_wa}
              onChange={(event) => setNoWa(event.target.value)}
            />

            <p>Password</p>
            <input
              className="w-full h-10 border border-slate-400 rounded-md hover:border-amber-400"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
            />

            <button
              onClick={handleSubmit}
              className=" my-4 hover:bg-green-600 w-full bg-green-800 text-white rounded-lg px-5 py-1 font-semibold"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Regis
