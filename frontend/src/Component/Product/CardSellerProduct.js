import React from 'react'

const CardSellerProduct = ({data}) => {
    return (
        <div className='flex gap-16 items-center p-1 border border-slate-400 rounded-md'>
            <img className='w-16 h-16 object-cover' src={`http://localhost:5000/${data.image}`}/>
            <div>{data.product_name}</div>
            <div>{data.description}</div>
            <div>{data.category}</div>
        </div>
    )
}

export default CardSellerProduct