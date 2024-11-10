import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const fetchingProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/${id}`);
                if(!response.ok) throw new Error("Gagal memuat product");
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchingProduct();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleEdit = async () => {
        const productData = new FormData();
        console.log('product:', product)

        if (!product) {
            console.log('Product is empty');
        }
        
        productData.append("product_name", product.product_name);
        productData.append("description", product.description);
        productData.append("category", product.category);
        productData.append("stock", product.stock);
        productData.append("price", product.price);
        productData.append("image", product.image)


        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'PATCH',
                body: productData
            });
            console.log("responsne", response)
        
            const updatedProduct = await response.json();
            console.log("updated product")
            setProduct(updatedProduct);
            navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar/>
            
            <div className='bg-green-300'>Ini contoh</div>

            <div className='flex gap-16'>
                <div>Product Name</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='product_name' value={product.product_name} onChange={handleChange}/>
            </div>

            <div className='flex gap-16'>
                <div>Product Description</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='description' value={product.description} onChange={handleChange}/>
            </div>

            <div className='flex gap-16'>
                <div>Product Category</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='category' value={product.category} onChange={handleChange}/>
            </div>

            <div className='flex gap-16'>
                <div>Product Stock</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='stock' value={product.stock} onChange={handleChange}/>
            </div>

            <div className='flex gap-16'>
                <div>Product Price</div>
                <input className="border border-slate-500 px-2 py-1 rounded-md" name='price' value={product.price} onChange={handleChange}/>
            </div>

            <div className='flex gap-16'>
                <div>Product Image</div>
                <img className='w-32 h-32 object-cover' src={`http://localhost:5000/${product.image}`}/>
                <input type='file' onChange={(event) => setProduct({...product, image: (event.target.files[0])})} />
            </div>

            <button onClick={handleEdit} className='px-8 py-1 bg-orange-400 rounded-md'>Edit</button>


        </div>
    )
}

export default EditProduct