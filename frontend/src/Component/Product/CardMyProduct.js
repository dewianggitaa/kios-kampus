import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const CardMyProduct = ({data}) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
        if (confirmDelete) {
            fetch(`http://localhost:5000/api/product/${data.product_id}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete product");
                }
                return response.text(); 
            })
            .then((message) => {
                console.log(message);
                alert("Produk berhasil dihapus!");
                window.location.reload(); 
            })
            .catch((error) => {
                console.error("Error in handleDelete:", error);
                alert("Gagal menghapus produk");
            });
        }
    };

    return (
        <div className='h-28 md:h-20 flex flex-col md:flex-row w-full items-center justify-between py-2 px-8 m-1 text-xs'>
            <div className='flex w-full justify-between md:gap-0 h-full items-center'>
                <img src={data.image} className=' w-16 h-16 object-cover rounded-full shadow-sm'/>
                <div className='text-center w-fit md:w-56'>{data.product_name}</div>
                <div className='text-center w-fit md:w-56'>{data.price}</div>
            </div>

            <div className='flex h-full items-center w-full justify-end gap-2 md:gap-0'>
                <Link to={`/edit-product?id=${data.product_id}`}>
                    <button className='text-center bg-orange-400 mr-0 md:mr-16 ml-0 md:ml-12 py-1 px-4 rounded-md text-white hover:bg-orange-500'>Edit</button>
                </Link>

                <button onClick={handleDelete} className='text-center bg-red-400 py-1 px-4 mr-2 rounded-md text-white hover:bg-red-600'>Delete</button>
            </div>
        </div>
    )
}

export default CardMyProduct
