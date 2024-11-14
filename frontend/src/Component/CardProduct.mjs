import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CardProduct = ({ data }) => {
  return (
    <Link to={`/product-detail?id=${data.product_id}`}>
      <div className="flex flex-col bg-white drop-shadow-xl w-48 h-84 my-4 rounded-lg">
        <img
          src={data.image}
          className="h-48 w-48 p-1 rounded-lg object-cover"
          alt="Product"
        />
        <div className="text-left font-bold px-2 py-1 text-xs">
          {data.product_name}
        </div>
        <div className="">
          <div className="inline-block px-2 text-xs bg-[#EAECEB] rounded-lg border-2 border-[#EAECEB] -mb-14 ml-1">
            {data.category}
          </div>
          <div className="px-2 text-xs ml-1">{data.stock}</div>
          <div className="px-2 text-xs ml-1">Rp.{data.price}</div>
        </div>

        <button className="my-2 mx-3 text-center text-xs bg-green-400 rounded-lg">
          See Details
        </button>
      </div>
    </Link>
  )
}

export default CardProduct
