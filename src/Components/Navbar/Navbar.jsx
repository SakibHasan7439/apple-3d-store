import React from 'react';
import {appleImg, bagImg, searchImg} from '../../utils'
import {navLists} from '../../utils/constant'
const Navbar = () => {
    return (
        <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
            <nav className='flex screen-max-width w-full'>
                <img src={appleImg} alt="apple logo" />
                {
                    navLists.map((item) =><div className='flex max-sm:hidden' key={item}>{item}</div>)
                }
                <div>
                    <img src={searchImg} alt="search image" width={18} height={18} />
                    <img src={bagImg} alt="bag image" width={18} height={18} />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;