import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import assignTypes from "../constant/PropTypes";
import { Perfumes } from "../assets";
import useCart from "../hook/useCart";
import Modal from "./Modal";


const ItemCard = ({item, disabled}) => {
    const {productName, tags, price, imageOf, brand, userId} = item;
    const uri = Perfumes?.[brand]?.[imageOf];
    const id = localStorage.getItem('id');
    const {handleAddToCart, handleBuyNow, isOwner, setIsOwner} = useCart();
    const isYourItem = id === userId;
    return (
       <>
            {isOwner &&  <Modal message={"You cannot buy your own item"} onClose={() => setIsOwner(false)}/>}
            <div className="itemCard">
                {isYourItem && (
                    <div className="banner">
                        <p>YOUR ITEM</p>
                    </div>
                )}
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
                <button disabled={disabled} className="addButton" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button disabled={disabled} className="buyButton" onClick={() => handleBuyNow(item)}>Buy Now</button>
            </div>
       </>
    )
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        productName: assignTypes.string,
        tags: PropTypes.arrayOf(assignTypes.string),
        price: assignTypes.number,
        imageOf: assignTypes.string,
        brand: assignTypes.string,
        userId: assignTypes.string
    }).isRequired,
    disabled: assignTypes.boolean
}

export default ItemCard