import React from 'react';
import logo from '../assets/logoNowhere_sg.png';

const Navbar = () => {
    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <img className="w-[max(10%,80px)]" src={logo} alt="" />
            <button className="bg-red-800 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
        </div>
    );
};

export default Navbar;
