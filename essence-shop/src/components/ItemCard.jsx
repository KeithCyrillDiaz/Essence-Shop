import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import assignTypes from "../constant/PropTypes";
import { Perfumes } from "../assets";
import useCart from "../hook/useCart";


const ItemCard = ({item}) => {
    const {productName, tags, price, imageOf, brand} = item;
    const uri = Perfumes?.[brand]?.[imageOf];

    const {handleAddToCart, handleBuyNow} = useCart();


    return (
        <div className="itemCard">
            <div className="imgContainer">
               {uri && (
                 <LazyLoad>
                    <img src={uri} alt="" />
                </LazyLoad>
               )}
            </div>
            <div className="details">
                <h3>{productName}</h3>
                <p>Brand: <strong>{brand}</strong></p>
                <div className="tagsContainer">
                {tags?.length > 0 && tags?.map((tag, index) => (
                    <div key={index} className="tags">
                        {tag}
                    </div>
                ))}
                </div>
            </div>   
            <h3 className="price">₱ {price}</h3>
            <button className="addButton" onClick={() => handleAddToCart(item)}>Add to Cart</button>
            <button className="buyButton" onClick={() => handleBuyNow(item)}>Buy Now</button>
        </div>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        productName: assignTypes.string,
        tags: PropTypes.arrayOf(assignTypes.string),
        price: assignTypes.number,
        imageOf: assignTypes.string,
        brand: assignTypes.string,
    }).isRequired,
    handleAddToCart: assignTypes.function,
    handleBuyNow: assignTypes.function
}

export default ItemCard