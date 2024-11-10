import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const CardMyProduct = ({data}) => {
    const navigate = useNavigate();

    const handleDelete = () => {

    }

    return (
        <div className='flex w-full items-center justify-center'>
            <img src={`http://localhost:5000/${data.image}`} className='w-16 h-16 object-cover'/>
            <div className='text-center w-56'>{data.product_name}</div>
            <div className='text-center w-56'>{data.price}</div>
            
            <Link to={`/edit-product?id=${data.product_id}`}>
                <button className='text-center bg-orange-300 w-16 mr-16 ml-16'>Edit</button>
            </Link>

            <button className='text-center bg-red-500 w-16'>Delete</button>
            
        </div>
    )
}

export default CardMyProduct