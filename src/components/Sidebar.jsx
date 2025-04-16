import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdInventory2 } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r border-gray-200">
            <div className="flex flex-col gap-4 pt-6 pl-4 text-sm">
                {/* Thêm sản phẩm */}
                <NavLink
                    to="/add"
                    className="flex items-center gap-3 px-3 py-2 rounded-l-md border border-gray-200 border-r-0
                     text-gray-700 hover:bg-red-800 hover:text-white transition-colors duration-150"
                >
                    <AiOutlinePlusCircle className="w-5 h-5" />
                    <span className="hidden md:block">Thêm sản phẩm</span>
                </NavLink>
                {/* Sản phẩm */}
                <NavLink
                    to="/lists"
                    className="flex items-center gap-3 px-3 py-2 rounded-l-md border border-gray-200 border-r-0
                     text-gray-700 hover:bg-red-800 hover:text-white transition-colors duration-150"
                >
                    <MdInventory2 className="w-5 h-5" />
                    <span className="hidden md:block">Danh sách Sản phẩm</span>
                </NavLink>
                {/* Đơn hàng */}
                <NavLink
                    to="/orders"
                    className="flex items-center gap-3 px-3 py-2 rounded-l-md border border-gray-200 border-r-0
                     text-gray-700 hover:bg-red-800 hover:text-white transition-colors duration-150"
                >
                    <FaClipboardList className="w-5 h-5" />
                    <span className="hidden md:block">Đơn hàng</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
