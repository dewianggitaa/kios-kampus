import React, { useState } from 'react'
import { useUser } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { PiCheckCircle } from 'react-icons/pi' // Untuk ikon ceklis

const EditProfile = () => {
    const { user, setUser } = useUser()
    const [password, setPassword] = useState('')
    const [showSuccess, setShowSuccess] = useState(false) // State untuk pop-up success
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        }))
    }

    const handleEdit = async () => {
        if (!user || !user.user_id) {
        console.error('User data or user_id is missing.')
        return
        }

        let isModified = false
        const userData = {}

        for (const key in user) {
        if (user[key] !== user.currentUser?.[key]) {
            userData[key] = user[key]
            isModified = true
        }
        }

        if (!isModified) {
        alert('No changes made to the profile.')
        return
        }

        try {
        const response = await fetch(
            `http://localhost:5000/api/user/${user.user_id}`,
            {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            }
        )

        if (!response.ok) throw new Error('Failed to edit user data')

        const updatedUser = await response.json()
        setUser(updatedUser)
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false) 
            navigate('/profile')
        }, 2000) 
        } catch (error) {
        console.error('Error in handleEdit:', error)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-xl shadow-xl w-3/4 max-w-3xl flex flex-col items-center">
            <table className="border-none w-full bg-white mb-0">
            <tbody>
                <tr>
                <td
                    colSpan="2"
                    className="text-lg text-[#FFFFFF] font-normal text-left py-3 bg-[#195319] p-2 cursor-pointer rounded-t-xl w-max"
                >
                    Edit Profile
                </td>
                </tr>
            </tbody>
            </table>

            <table className="border border-slate-300 w-full bg-white shadow-lg p-8 mt-0 rounded-t-xl">
            <tbody>
                <tr>
                <td className="py-4 px-6 text-left">Name</td>
                <td className="py-4 px-6">
                    <input
                    className="flex bg-[#EAECEB] w-full gap-5 rounded-xl p-1 mb-5"
                    name="name"
                    value={user?.name || ''}
                    onChange={handleChange}
                    />
                </td>
                </tr>

                <tr>
                <td className="py-4 px-6 text-left">Email Address</td>
                <td className="py-4 px-6">
                    <input
                    className="flex bg-[#EAECEB] w-full gap-5 rounded-xl p-1 mb-5"
                    name="email"
                    value={user?.email || ''}
                    onChange={handleChange}
                    />
                </td>
                </tr>

                <tr>
                <td className="py-4 px-6 text-left">New Password</td>
                <td className="py-4 px-6">
                    <input
                    className="flex bg-[#EAECEB] w-full gap-5 rounded-xl p-1 mb-5"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </td>
                </tr>

                <tr>
                <td colSpan="2" className="py-4 px-6 text-end">
                    <button
                    onClick={handleEdit}
                    className="bg-[#195319] px-8 py-2 rounded-md text-white"
                    >
                    Update Profile
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>

        {showSuccess && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-5 rounded-xl shadow-xl w-1/4 h-1/8 flex flex-col items-center">
                <div className="bg-[#195319] w-full h-1/2 flex justify-center items-center rounded-t-xl">
                <PiCheckCircle className="text-4xl text-white" />
                </div>
                <div className="bg-white w-full h-1/2 flex justify-center items-center rounded-b-xl">
                <h2 className="text-xl font-semibold text-center text-[#195319]">
                    Edit Success!
                </h2>
                </div>
            </div>
            </div>
        )}
        </div>
    )
}

export default EditProfile
