export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(price);
};
