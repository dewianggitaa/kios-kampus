import React from 'react';
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = ({ onCategorySelect }) => {
    const handleCategoryClick = (category) => {
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <div className='z-999 sticky top-0 w-full flex justify-between px-16 py-2 bg-gray-100'>
            <Link to="/home">
                <img src={logo} className='h-8 w-auto object-cover' />
            </Link>

            <div className="flex border border-slate-400 rounded-full w-1/3">
                <input className='pl-3 w-full bg-transparent placeholder:text-xs focus:outline-none text-xs' placeholder='Search Product' />
                <button className="pr-3"><IoSearch /></button>
            </div>

            <ul className='flex gap-4 text-xs items-center font-medium justify-end'>
                <li>
                    <Menu as="div" className="relative inline-block text-left">
                        <div className='w-24'>
                            <MenuButton className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                Category
                                <IoIosArrowDown />
                            </MenuButton>
                        </div>

                        <MenuItems transition className="absolute right-0 z-50 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                        <MenuItem>
                                <button onClick={() => handleCategoryClick('')} className='rounded-t-md block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    All Category
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Books and Stationary')} className='rounded-t-md block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Books and Stationary
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Clothing and Accessories')} className='block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Clothing and Accessories
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Electronics')} className='block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Electronics
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Foods and Beverages')} className='block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Foods and Beverages
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Service')} className='block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Service
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => handleCategoryClick('Other')} className='rounded-b-md block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100'>
                                    Other
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </li>
                <Link to="/add-product">
                    <button>
                        <li>Sell Now</li>
                    </button>
                </Link>
                
                <Link to="/profile">
                    <button>
                        <li>Profile</li>
                    </button>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
