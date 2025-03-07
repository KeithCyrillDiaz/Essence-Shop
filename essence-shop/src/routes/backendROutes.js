

const BASED_URL = `${import.meta.env.VITE_BACKEND_URL}/EssenceShop`;

const backendRoutes = {
    user: {
        register: `${BASED_URL}/register`,
        login: `${BASED_URL}/login`,
        updateStatus: `${BASED_URL}/user/updateStatus`,
        getUserDetails: `${BASED_URL}/user/getUserProfile`,
        updateAddress: `${BASED_URL}/user/updateAddress`
    },
    products: {
        getInventoryProducts: `${BASED_URL}/user/products/get`,
        getBestSellers: `${BASED_URL}/products/getBestSellers`,
        getAllproducts: `${BASED_URL}/products/getAllProducts`,
        addProduct: `${BASED_URL}/user/products/create`
    },

    admin: {
        userCount: `${BASED_URL}/count/user`,
        login: `${BASED_URL}/admin/login`,
        getTotals: `${BASED_URL}/admin/total/get`,
        getUsers: `${BASED_URL}/admin/users/get`
    },
    sales: {
        getSalesHistory: `${BASED_URL}/user/sales/get`,
        updateSalesStatus: `${BASED_URL}/user/sales/updateStatus/`
    },
    order: {
        getOrderHistory: `${BASED_URL}/user/order/get`,
        updateStatus: `${BASED_URL}/user/order/updateStatus`,
        createOrder: `${BASED_URL}/user/order/create`
    },
    cart: {
        getCart: `${BASED_URL}/user/cart/get`,
        updateAndGetCart: `${BASED_URL}/user/cart/updateAndGet`,
        deleteCart: `${BASED_URL}/user/cart/delete`
    }
}

export default backendRoutes;