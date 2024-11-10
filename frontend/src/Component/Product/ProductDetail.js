import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../Navbar';

const ProductDetail = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/product/${id}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data produk');
                }
                const data = await response.json();
                setProduct(data);
                console.log('Data produk:', data);
                
                const sellerResponse = await fetch(`http://localhost:5000/api/user/${data.users_id}`);
                if (!sellerResponse.ok) {
                    throw new Error('Gagal mengambil data penjual');
                }
                const sellerData = await sellerResponse.json();
                setSeller(sellerData);
            } catch (error) {
                setError(error.message);
                console.error('Terjadi kesalahan:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const whatsappLink = seller
        ? `https://wa.me/${seller.no_wa}?text=Halo%20${seller.name},%20saya%20tertarik%20dengan%20produk%20Anda%20${product.product_name}`
        : '#';

    return (
        <div>
            <Navbar/>
            {isLoading ? (
                <div>Sedang memuat data produk...</div>
            ) : error ? (
                <div>Terjadi kesalahan: {error}</div>
            ) : (
                <div>
                    <div>Detail Produk</div>
                    <div>{product.product_name}</div>
                    <img src={`http://localhost:5000/${product.image}`} alt={product.product_name} />
                    <Link to={`/seller-profile?id=${seller.user_id}`}>
                        <div className="font-bold text-blue-500">{seller.name}</div>
                    </Link>
                    <div>{product.description}</div>
                    <div>Kategori: {product.category}</div>
                    <div>Harga: Rp.{product.price}</div>
                    <div>Stok: {product.stock}</div>
                    <a href={whatsappLink}>
                        <button className='py-2 px-4 bg-green-400 rounded-md'>Chat Seller</button>
                    </a>
                    
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
