
const BASED_URL = import.meta.env.VITE_BACKEND_URL;

const backendRoutes = {
    user: {
        register: `${BASED_URL}/EssenceShop/user/register`,
        login: `${BASED_URL}/EssenceShop/user/login`,
        updateStatus: `${BASED_URL}/EssenceShop/user/updateStatus`,
        getUserDetails: `${BASED_URL}/EssenceShop/user/getUserProfile`,
    },
    products: {
        getBestSellers: `${BASED_URL}/EssenceShop/user/products/getBestSellers`,
        getAllproducts: `${BASED_URL}/EssenceShop/user/products/getAllProducts`
    },

    admin: {
        userCount: `${BASED_URL}/EssenceShop/count/user`
    },
    sales: {
        getSalesHistory: `${BASED_URL}/EssenceShop/user/sales/get`
    },
    order: {
        getOrderHistory: `${BASED_URL}/EssenceShop/user/order/get`,
        updateStatus: `${BASED_URL}/EssenceShop/user/order/updateStatus`
    },
    cart: {
        getCart: `${BASED_URL}/EssenceShop/user/cart/get`,
        updateAndGetCart: `${BASED_URL}/EssenceShop/user/cart/updateAndGet`
    }
}

export default backendRoutes;