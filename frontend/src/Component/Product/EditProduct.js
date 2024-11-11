import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const EditProduct = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [initialProduct, setInitialProduct] = useState(null); 
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const fetchingProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/${id}`);
                if (!response.ok) throw new Error("Gagal memuat product");
                const data = await response.json();
                setProduct(data);
                setInitialProduct(data); // Set initial product data
            } catch (error) {
                console.log(error);
            }
        }

        fetchingProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleEdit = async () => {
        const productData = new FormData();
        let isModified = false;

        for (const key in product) {
            if (product[key] !== initialProduct[key]) {
                productData.append(key, product[key]);
                isModified = true;
            }
        }

        if (image) {
            productData.append("image", image);
            isModified = true;
        }

        if (!isModified) {
            alert("No changes made to the product.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'PATCH',
                body: productData
            });

            if (!response.ok) throw new Error("Gagal mengedit produk");

            const updatedProduct = await response.json();
            setProduct(updatedProduct);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-8 py-6 bg-white rounded-lg shadow-md">
          <Navbar />
          <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Name</label>
              <input
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
              />
            </div>
      
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Description</label>
              <input
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>
      
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Category</label>
              <input
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </div>
      
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Stock</label>
              <input
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </div>
      
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Price</label>
              <input
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>
      
            <div className="flex items-center gap-8">
              <label className="w-36 text-gray-700 font-medium">Product Image</label>
              <div className="flex items-center gap-4">
                <img
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                  src={`http://localhost:5000/${product.image}`}
                  alt="Product"
                />
                <input
                  type="file"
                  onChange={(event) => setImage(event.target.files[0])}
                  className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-md file:bg-white file:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
      
            <button
              onClick={handleEdit}
              className="w-15 px-4 py-2 mt-8 mx-8 bg-green-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Edit
            </button>
          </div>
        </div>
      );
      
}

export default EditProduct;
