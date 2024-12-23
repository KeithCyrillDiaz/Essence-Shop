import { useEffect, useState } from "react";
import assignTypes from "../../constant/PropTypes";
import Divider from "../Divider";
import RenderItems from "../RenderItems";
import { categoriesImages } from "../../assets";
import axios from "axios";
import backendRoutes from "../../routes/backendROutes";
import Loader from "../Loader";


const RenderCategoriesItem = ({category}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

  

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching Products for Categories");
                setLoading(true);
                const response = await axios.get(
                    backendRoutes.products.getAllproducts
                )
    
                if(!response.data) {
                    console.log("Error Fetching Data");
                    return
                }
    
                const {data} = response.data;
                console.log("category: ", category)
                const getProducts = data.filter((item) => 
                    item.scentProfile.includes(category) || item.bestFor.includes(category)
                  );
    
                console.log("products: ", JSON.stringify(getProducts,null,2))
                if(getProducts) setProducts(getProducts)
    
    
            } catch (error) {
                console.error("Error Fetching Products", error);
            } finally {
                setLoading(false)
            }
        }
    
        fetchProducts();
        
    },[category])
    
    if(loading) {
        return <Loader/>
    }

  return (
    <div className="container categories">
        <div className="space">space</div>
            <div className="carouselContainer imgContainer">
                <img src={categoriesImages[
                        category === "Fresh & Clean" ? "fresh" :
                        category === "Sweet & Gourmand" ? "sweet" :
                        category === "Woody & Earthy" ? "woodyAndEarthy" :
                        category === "Oriental & Spicy" ? "orientalAndSpicy" :
                        category.toLowerCase()
                ]} alt="" />
            </div>
            <Divider title={`${category}`}/>
            {products.length === 0 ? (
                <h2>No Products found for {category} category</h2>
                ) : (
                    <RenderItems products={products}/>
                )}
    </div>
  )
}

RenderCategoriesItem.propTypes = {
    category: assignTypes.string
}

export default RenderCategoriesItem
