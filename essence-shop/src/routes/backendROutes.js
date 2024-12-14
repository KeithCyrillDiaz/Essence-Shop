
const BASED_URL = import.meta.env.VITE_BACKEND_URL;
console.log('Based Url: ', BASED_URL);

const backendRoutes = {
    user: {
        register: `${BASED_URL}/EssenceShop/user/register`,
        login: `${BASED_URL}/EssenceShop/user/login`,
    },
    admin: {
        userCount: `http://localhost:3001/EssenceShop/count/user/`
    }
}

export default backendRoutes;