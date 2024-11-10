import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import landingImage from '../assets/homepage.jpg';
import CardProduct from './CardProduct.mjs';
import { useUser } from '../UserContext';

const Homepage = () => {
    const [data, setData] = useState([]); // All products
    const [error, setError] = useState(null);
    const { user } = useUser(); 
    const [selectedCategory, setSelectedCategory] = useState("");
<<<<<<< HEAD
=======
    const [searchResults, setSearchResults] = useState([]); // For filtered results based on search
    const [searchQuery, setSearchQuery] = useState(''); // Track the search query
>>>>>>> 71095e8 (add search feature)

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
    };

<<<<<<< HEAD
=======
    const handleSearchResults = (results, query) => {
        setSearchResults(results);
        setSearchQuery(query);
    };

    // Reset to all products if searchQuery is cleared
    const handleClearSearch = () => {
        setSearchResults([]);
        setSearchQuery(''); // Clear the search query
    };

>>>>>>> 71095e8 (add search feature)
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    // Display either searchResults or all products if searchResults is empty
    const displayedProducts = searchResults.length === 0 ? data : searchResults;

    return (
        <div>
            <Navbar 
                onCategorySelect={handleCategorySelect} 
                onSearchResults={handleSearchResults}
                onClearSearch={handleClearSearch} // Pass clear search to Navbar
            />
            <div className='bg-green-100 h-screen overflow-y-auto'>
                <img src={landingImage} className='h-36 w-full object-cover' />
                <div className='flex flex-wrap gap-4 w-full px-16 py-8 justify-center space-x-4'>
                    {error && <div>Error: {error.message}</div>}
                    {displayedProducts.length > 0 ? (
                        (selectedCategory === '' ? displayedProducts : displayedProducts.filter(product => product.category === selectedCategory))
                            .map((product) => (
                                <CardProduct key={product.id} data={product} />
                            ))
                    ) : (
                        <div>No products found</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
