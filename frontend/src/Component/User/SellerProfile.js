import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardProduct from '../CardProduct.mjs';
import Navbar from '../Navbar';
import CardSellerProduct from '../Product/CardSellerProduct';

const SellerProfile = () => {
    const location = useLocation();
    const [seller, setSeller] = useState(null); 
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    console.log(id);

    useEffect(() => {
        const fetchingSellerData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${id}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data Penjual");
                }
                const data = await response.json();
                setSeller(data);

                const sellerProductResponse = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!sellerProductResponse.ok) {
                    throw new Error("Gagal mengambil produk Seller");
                }
                const productData = await sellerProductResponse.json();
                setProducts(productData);
            } catch (error) {
                setError(error.message);
                console.error('Terjadi kesalahan:', error);
            }
        };

        fetchingSellerData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!seller || !products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div>{seller.name}</div>
            <button>Chat Sekarang</button>
            <div>
                {products.map((product) => (
                    <Link to={`/product-detail?id=${product.product_id}`}>
                        <CardSellerProduct key={product.id} data={product} />
                    </Link>
                    
                ))}
            </div>
        </div>
    );
};

export default SellerProfile;
