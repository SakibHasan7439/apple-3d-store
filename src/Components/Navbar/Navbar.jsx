import React from 'react';
import {appleImg, bagImg, searchImg} from '../../utils'
import {navLists} from '../../utils/constant'
const Navbar = () => {
    return (
        <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
            <nav className='flex justify-between screen-max-width w-full'>
                <img src={appleImg} alt="apple logo" />
                <div className='flex max-sm:hidden'>
                    {
                    navLists.map((item) =><div className='text-sm text-gray-300 hover:text-white transition-all px-5 cursor-pointer' key={item}>{item}</div>)
                    }
                </div>
                <div className='flex justify-baseline gap-7 max-sm:flex-1 max-sm:justify-end'>
                    <img src={searchImg} alt="search image" width={18} height={18} />
                    <img src={bagImg} alt="bag image" width={18} height={18} />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;