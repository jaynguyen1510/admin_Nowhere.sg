import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { formatPrice } from '../utils/formatPrice';
import { Loader2, Trash2 } from 'lucide-react';

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removingId, setRemovingId] = useState(null); // ← theo dõi item đang xóa

    const fetchList = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/product/list-product`);
            if (res.data.success && res.data.products.length > 0) {
                setList(res.data.products);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveProduct = async (id) => {
        setRemovingId(id);
        try {
            const res = await axios.post(
                `${backendUrl}/product/remove-product`,
                { id },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            if (res.data.success) {
                setList((prev) => prev.filter((item) => item._id !== id));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setRemovingId(null);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="p-4">
            <p className="text-xl font-bold mb-4 text-red-800">ALL Products List</p>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="animate-spin w-10 h-10 text-red-800" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200 text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="p-3 border-b">Image</th>
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Category</th>
                                <th className="p-3 border-b">Price</th>
                                <th className="p-3 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 ? (
                                list.map((item) => (
                                    <tr key={item._id} className="hover:bg-red-50">
                                        <td className="p-3 border-b">
                                            <img
                                                src={item.image?.[0]}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-3 border-b text-red-800 font-medium">{item.name}</td>
                                        <td className="p-3 border-b">{item.category}</td>
                                        <td className="p-3 border-b text-red-800">{formatPrice(item.price)}₫</td>
                                        <td className="p-3 border-b text-center">
                                            <button
                                                onClick={() => handleRemoveProduct(item._id)}
                                                disabled={removingId === item._id}
                                                className="p-2 bg-red-800 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                aria-label="Delete product"
                                            >
                                                {removingId === item._id ? (
                                                    <Loader2 className="animate-spin w-5 h-5" />
                                                ) : (
                                                    <Trash2 className="w-5 h-5" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default List;
