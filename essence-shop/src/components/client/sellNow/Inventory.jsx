import axios from "axios";
import { useEffect, useState } from "react";
import backendRoutes from "../../../routes/backendROutes";
import ItemCard from "../../ItemCard";
import Pagination from "../../Pagination";
import usePagination from "../../../hook/usePagination";
import Divider from "../../Divider";
import SessionExpired from "../SessionExpired";
import Loader from "../../Loader";

const Inventory = () => {

 const [inventory, setInventory] = useState([]);
 const [loading, setLoading] = useState(false);
 const [isSessionExpired, setIsSessionExpired] = useState(false)
 const {currentItems, totalPages, handlePageChange, currentPage} = usePagination(inventory)


 const fetchProducts = async () => {
  try {
      setLoading(true);
      console.log("Fetching Products from Inventory");
      const token = localStorage.getItem('token');

      const response = await axios.get(
        backendRoutes.products.getInventoryProducts,
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      )

      if(response.status === 401){
        setIsSessionExpired(true);
        return
      }

      if(!response.data) {
        console.log("Error Fetching Products from Inventory")
        return
      }

      const {data} = response.data;
      
      if(data) setInventory(data);
      console.log("data: ", JSON.stringify(data, null, 2))
      
  } catch (error) {
    console.error("Error Fetching Invventory", error)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchProducts();
},[])

if(loading) {
  return <Loader/>
}

  return (
    <div className=" container inventory">
      {isSessionExpired && ( <SessionExpired/>)}
        {currentItems.length !== 0 && (
          <>
            <Divider title="Inventory"/>
            <div className="productsContainer">
                {currentItems.map((item, index) => (
                  <ItemCard 
                      key={index}
                      item={item} 
                  />
              ))}
          </div>
          <Pagination 
          handlePageChange={handlePageChange} 
          totalPages={totalPages} 
          currentPage={currentPage}/>
          </>
        )}
    </div>
  )
}

export default Inventory
