import React from 'react'

const CardSellerProduct = ({data}) => {
    return (
        <div className='w-full text-xs md:text-sm flex gap-8 md:gap-16 items-center justify-evenly px-4 md:px-12 py-2 p-1 border border-slate-400 hover:border-green-500 hover:border-2 rounded-md'>
            <img className='w-16 h-16 object-cover' src={data.image}/>
            <div>{data.product_name}</div>
            <div>{data.stock}</div>
        </div>
    )
}

export default CardSellerProduct