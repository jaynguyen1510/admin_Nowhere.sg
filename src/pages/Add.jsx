import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';

const Add = ({ token }) => {
    const [imageFiles, setImageFiles] = useState([null, null, null, null]);
    const [previewImages, setPreviewImages] = useState([null, null, null, null]);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('White');
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [isBestseller, setIsBestseller] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newFiles = [...imageFiles];
            const newPreviews = [...previewImages];
            newFiles[index] = file;
            newPreviews[index] = URL.createObjectURL(file);
            setImageFiles(newFiles);
            setPreviewImages(newPreviews);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // ✅ bật loading
        try {
            const formData = new FormData();
            formData.append('name', productName);
            formData.append('description', productDescription);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('size', JSON.stringify(sizes));
            formData.append('bestSeller', isBestseller);

            imageFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`image${index + 1}`, file);
                }
            });

            const res = await axios.post(`${backendUrl}/product/add-product`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                toast.success(res.data.message || 'Thêm sản phẩm thành công!');
                setIsLoading(false);
                setPreviewImages([null, null, null, null]);
                setImageFiles([null, null, null, null]);
                setProductName('');
                setProductDescription('');
                setPrice('');
            } else {
                toast.error(res.data.message || 'Lỗi thêm sản phẩm!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="py-8 px-4 bg-white rounded-2xl shadow-md max-w-4xl mx-auto">
            {/* Upload hình ảnh */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                {[0, 1, 2, 3].map((index) => (
                    <label
                        key={index}
                        htmlFor={`image${index}`}
                        className="group aspect-square w-20 md:w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-red-800 transition duration-200 overflow-hidden"
                    >
                        {previewImages[index] ? (
                            <img
                                src={previewImages[index]}
                                alt={`Ảnh ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <>
                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full group-hover:bg-red-800 transition duration-200">
                                    <UploadCloud className="w-5 h-5 md:w-6 md:h-6 text-red-800 group-hover:text-white transition duration-200" />
                                </div>
                                <span className="mt-2 text-xs text-red-800 text-center">Tải ảnh</span>
                            </>
                        )}
                        <input
                            id={`image${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, index)}
                        />
                    </label>
                ))}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="space-y-6 mt-8">
                <div>
                    <label htmlFor="productName" className="block mb-1 text-sm font-medium text-red-800">
                        Tên sản phẩm
                    </label>
                    <input
                        onChange={(e) => setProductName(e.target.value)}
                        id="productName"
                        type="text"
                        value={productName}
                        required
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 hover:border-red-800 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="productDescription" className="block mb-1 text-sm font-medium text-red-800">
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        onChange={(e) => setProductDescription(e.target.value)}
                        id="productDescription"
                        required
                        value={productDescription}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 hover:border-red-800 resize-none transition duration-200"
                        rows={4}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="category" className="block mb-1 text-sm font-medium text-red-800">
                            Danh mục
                        </label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="category"
                            value={category}
                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-800 hover:border-red-800 transition duration-200"
                        >
                            <option value="Men">Nam</option>
                            <option value="Women">Nữ</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subCategory" className="block mb-1 text-sm font-medium text-red-800">
                            Phân loại
                        </label>
                        <select
                            onChange={(e) => setSubCategory(e.target.value)}
                            id="subCategory"
                            value={subCategory}
                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-800 hover:border-red-800 transition duration-200"
                        >
                            <option value="Black">Màu đen</option>
                            <option value="White">Màu trắng</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-1 text-sm font-medium text-red-800">
                            Giá sản phẩm
                        </label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                            type="number"
                            value={price}
                            required
                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-800 hover:border-red-800 transition duration-200"
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-2 font-medium text-red-800">Size</p>
                    <div className="flex gap-4">
                        {['S', 'M'].map((size) => (
                            <span
                                onClick={() =>
                                    setSizes((prev) =>
                                        prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size],
                                    )
                                }
                                key={size}
                                className={`px-4 py-2 text-sm rounded-lg cursor-pointer transition duration-200 
                                ${sizes.includes(size) ? 'bg-red-800 text-white' : 'bg-slate-200 hover:bg-red-800 hover:text-white'}`}
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        onChange={() => setIsBestseller((prev) => !prev)}
                        type="checkbox"
                        id="bestseller"
                        className="accent-red-800"
                        checked={isBestseller}
                    />
                    <label htmlFor="bestseller" className="text-sm cursor-pointer text-gray-700">
                        Thêm sản phẩm vào mục bán chạy
                    </label>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-4 px-6 py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto
                            ${isLoading ? 'bg-red-600 cursor-not-allowed' : 'bg-red-800 hover:bg-red-700 text-white'}`}
                    >
                        {isLoading && <AiOutlineLoading className="animate-spin text-white w-5 h-5" />}
                        {isLoading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Add;
