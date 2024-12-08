import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = ({ onCategorySelect, onSearchResults, onClearSearch, enableSearch, enableCategory }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            fetch(`http://localhost:5000/api/products/search/${query}`)
                .then(res => res.json())
                .then(results => onSearchResults(results, query));
        } else {
            onClearSearch(); // Clear the search if the input is empty
        }
    };

    const handleCategoryClick = (category) => {
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <div className='z-10 sticky top-0 w-full flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between px-16 py-2 bg-gray-100 shadow-md'>
            <div className='flex justify-between pt-2 md:pt-0'>
                <Link to="/home">
                    <img src={logo} className='h-8 w-auto object-cover' alt="Logo" />
                </Link>

                {enableSearch && (
                <div className="flex border border-slate-400 rounded-full w-1/3">
                    <input 
                        className='pl-3 w-full bg-transparent placeholder:text-xs focus:outline-none text-xs' 
                        placeholder='Search' 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                    <button className="pr-3"><IoSearch /></button>
                </div>
                )}

                {enableCategory && (
                    <Menu as="div" className="relative inline-block text-left pb-2 md:pb-0">
                        <div className='w-24'>
                            <MenuButton className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                Category
                                <IoIosArrowDown />
                            </MenuButton>
                        </div>

                        <MenuItems className="absolute right-0 z-50 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('')} className='w-full text-left rounded-t-md block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    All Category
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Books and Stationary')} className='w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Books and Stationary
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Clothing and Accessories')} className='w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Clothing and Accessories
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Electronics')} className='w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Electronics
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Foods and Beverages')} className='w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Foods and Beverages
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Service')} className='w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Service
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Other')} className='w-full text-left rounded-b-md block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Other
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>    
                )}
                
            </div>

            <div className='flex justify-between'>
                <ul className='flex gap-4 text-xs items-center font-medium justify-end'>
                    <Link to="/add-product">
                        <button className='px-4 py-1 rounded-full hover:bg-white '>
                            <li className='font-medium'>Sell Now</li>
                        </button>
                    </Link>

                    <Link to="/profile">
                        <button className='px-4 py-1 rounded-full hover:bg-white '>
                            <li className='font-medium'>Profile</li>
                        </button>
                    </Link>
                </ul>
            </div>
            
        </div>
    );
};

export default Navbar;
