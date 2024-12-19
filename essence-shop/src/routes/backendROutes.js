
const BASED_URL = import.meta.env.VITE_BACKEND_URL;

const backendRoutes = {
    user: {
        register: `${BASED_URL}/EssenceShop/user/register`,
        login: `${BASED_URL}/EssenceShop/user/login`,
    },
    products: {
        getBestSellers: `${BASED_URL}/EssenceShop/user/products/getBestSellers`,
        getAllproducts: `${BASED_URL}/EssenceShop/user/products/getAllProducts`
    },

    admin: {
        userCount: `${BASED_URL}/EssenceShop/count/user/`
    }
}

export default backendRoutes;