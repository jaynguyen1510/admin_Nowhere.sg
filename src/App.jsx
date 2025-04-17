/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL_USER;

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);
    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            {token === '' ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Navbar setToken={setToken} />
                    <hr />
                    <div className="flex w-full">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main content */}
                        <div className="w-full sm:w-[calc(100%-250px)] mx-auto my-8 text-gray-600 text-base">
                            {/* Nội dung chính của bạn */}
                            <Routes>
                                <Route path="/add" element={<Add token={token} />} />
                                <Route path="/lists" element={<List token={token} />} />
                                <Route path="/orders" element={<Orders token={token} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
