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
        <div>
            <Navbar />
            <div className='flex gap-16'>
                <div>Product Name</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='product_name' value={product.product_name} onChange={handleChange} />
            </div>
            <div className='flex gap-16'>
                <div>Product Description</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='description' value={product.description} onChange={handleChange} />
            </div>
            <div className='flex gap-16'>
                <div>Product Category</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='category' value={product.category} onChange={handleChange} />
            </div>
            <div className='flex gap-16'>
                <div>Product Stock</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='stock' value={product.stock} onChange={handleChange} />
            </div>
            <div className='flex gap-16'>
                <div>Product Price</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='price' value={product.price} onChange={handleChange} />
            </div>
            <div className='flex gap-16'>
                <div>Product Image</div>
                <img className='w-32 h-32 object-cover' src={`http://localhost:5000/${product.image}`} alt="Product" />
                <input type='file' onChange={(event) => setImage(event.target.files[0])} />
            </div>
            <button onClick={handleEdit} className='px-8 py-1 bg-orange-400 rounded-md'>Edit</button>
        </div>
    )
}

export default EditProduct;
