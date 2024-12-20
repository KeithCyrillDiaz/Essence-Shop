import axios from "axios";
import Divider from "../Divider";
import backendRoutes from "../../routes/backendROutes";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import usePagination from "../../hook/usePagination";
import Pagination from "../Pagination";

const ExploreScents = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {currentItems, totalPages, handlePageChange, currentPage} = usePagination(products)

    const fetchProducts = async () => {
        try {
            console.log("Fetching Products");
            const token = localStorage.getItem('token');
            const response = await axios.get(
                backendRoutes.products.getAllproducts,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if(!response.data) {
                console.error(response.status);
                return;
            }

            const {data} = response.data;

            if(!data) {
                console.log("Data not Found");
                return;
            }
            
            setProducts(data);
            console.log("Successfully Fetched Products");

        } catch (error) {
            console.log("Error Fetching Products");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    },[])

    if(loading) {
        return (
            <Loader/>
        )
    }

    if(products.length === 0) {
        return (
            <div className="container noDataFound">No Products Available at the moment</div>
        )
    }



  return (
    <div className="container exploreScents" id="shop">
        <Divider title="Explore Scents" />
        <div className="productsContainer container">
            {currentItems.map((item, index) => (
                <ItemCard 
                    key={index}
                    item={item} 
                />
            ))}
        </div>
        <Pagination handlePageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage}/>
    </div>
  )
}

export default ExploreScents;
