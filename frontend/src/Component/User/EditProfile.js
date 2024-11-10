import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { user, setUser } = useUser();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEdit = async () => {
        if (!user || !user.user_id) {
            console.error("User data or user_id is missing.");
            return;
        }
    
        let isModified = false;
        const userData = {};
    
        // Track modified fields
        for (const key in user) {
            if (user[key] !== user.currentUser?.[key]) {
                userData[key] = user[key];
                isModified = true;
            }
        }
    
        if (password) {
            userData["password"] = password;
            isModified = true;
        }
    
        if (!isModified) {
            alert("No changes made to the profile.");
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:5000/api/user/${user.user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),  // Make sure it's stringified JSON
            });
    
            if (!response.ok) throw new Error("Failed to edit user data");
    
            const updatedUser = await response.json();
            setUser(updatedUser);
            navigate("/profile");
        } catch (error) {
            console.error("Error in handleEdit:", error);
        }
    };
    

    return (
        <div className='h-screen'>
            <Navbar />
            <div className='flex flex-col h-full w-full justify-center items-center'>
                <div>
                    <div className='flex gap-20'>
                        <div>Full Name</div>
                        <input
                            className='border border-slate-500 rounded-md px-2 py-1'
                            name='name'
                            value={user?.name || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-20'>
                        <div>Email</div>
                        <input
                            className='border border-slate-500 rounded-md px-2 py-1'
                            name='email'
                            value={user?.email || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-20'>
                        <div>WhatsApp Number</div>
                        <input
                            className='border border-slate-500 rounded-md px-2 py-1'
                            name='no_wa'
                            value={user?.no_wa || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-20'>
                        <div>Password</div>
                        <input
                            className='border border-slate-500 rounded-md px-2 py-1'
                            name='password'
                            type='password'
                            placeholder='Enter new Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button onClick={handleEdit} className='bg-orange-400 px-8 py-2 rounded-md'>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
