

const BASED_URL = `${import.meta.env.VITE_BACKEND_URL}/EssenceShop`;

const backendRoutes = {
    user: {
        register: `${BASED_URL}/user/register`,
        login: `${BASED_URL}/user/login`,
        updateStatus: `${BASED_URL}/user/updateStatus`,
        getUserDetails: `${BASED_URL}/user/getUserProfile`,
    },
    products: {
        getBestSellers: `${BASED_URL}/user/products/getBestSellers`,
        getAllproducts: `${BASED_URL}/user/products/getAllProducts`
    },

    admin: {
        userCount: `${BASED_URL}/count/user`
    },
    sales: {
        getSalesHistory: `${BASED_URL}/user/sales/get`
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