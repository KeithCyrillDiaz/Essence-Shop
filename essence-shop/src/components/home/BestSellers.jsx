
import { useEffect, useState } from "react";
import axios from 'axios';
import backendRoutes from "../../routes/backendROutes";
import Loader from "../Loader";
import Slider from "react-slick";
import ItemCard from "../ItemCard";
import useCart from "../../hook/useCart";

const BestSellers = () => {

    const [bestSellerData, setBestSellersData] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const {handleAddToCart, handleBuyNow} = useCart();

    const fetchData = async () => {
        try {
            console.log("Fetching Best Sellers");
            const response = await axios.get(
                backendRoutes.products.getBestSellers,
            )

            if (!response.data || !response.data.data) {
                console.error('No data found', response.status);
                return;
            }

            const {data} = response.data;

            if(data.length === 0) {
                setBestSellersData([]);
                return;
            }

            const formattedData = data.map((item) => {
                const {occasion, bestFor} = item;
                return {
                    ...item,
                    tags: [...occasion, ...bestFor]
                }
            })

            setBestSellersData(formattedData);
            console.log("data: ", data)
            console.log("Successfully Fetched Best Sellers");

        } catch (error) {
            console.error("Error Fetching Best Sellers", error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    if(loading){
        return (
            <Loader/>
        )
    }

    if(bestSellerData.length === 0) {
        return (
            <div className="container noDataFound">No Best Sellers at the moment</div>
        )
    }

    const settings = {
        dots: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1
      };

  return (
    <div className="container bestSeller">
        <h2>Best Sellers</h2>
        <Slider {...settings}>
            {bestSellerData.map((item, index) => (
                <ItemCard
                key={index}
                item={item} 
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                />
            ))}
        </Slider>
      
    </div>
  )
}

export default BestSellers
