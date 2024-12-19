
import { useEffect, useState } from "react";
import axios from 'axios';
import backendRoutes from "../../routes/backendROutes";
import Loader from "../Loader";
import Slider from "react-slick";
import ItemCard from "../ItemCard";
import useCart from "../../hook/useCart";

const BestSellers = () => {

    const [bestSellerData, setBestSellersData] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzVjNGFhNDMxNmVlZmNiOWVjNzNjYTciLCJpYXQiOjE3MzQxODM3MTYsImV4cCI6MTczNDc4ODUxNn0.Q6jm-zFLrCQOddRdxs8pUJBBvzgY0qxSbG4PlSGLOZg"

    const [loading, setLoading] = useState(true);
    
    const {handleAddToCart, handleBuyNow} = useCart();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                backendRoutes.products.getBestSellers,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data.data) {
                console.error(response.status);
                return
            }
            const {data} = response.data;

            if(data.length === 0) {
                setBestSellersData([]);
                return
            }

            const formattedData = data.map((item) => {
                const {occasion, bestFor} = item;
                return {
                    ...item,
                    tags: [...occasion, ...bestFor]
                }
            })

            setBestSellersData(formattedData);

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
