
import { useEffect, useState } from "react";
import assignTypes from "../../constant/PropTypes"
import Divider from "../Divider"
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Loader";
import axios from "axios";
import backendRoutes from "../../routes/backendROutes";
import { updateWholeCart, updateQuantity } from "../../redux/actions";
import PropTypes from "prop-types";

const CartTab = () => {

    const buttons = [
        "Price",
        "Quantity",
        "Total Price",
        "Actions"
    ]

  return (
    <div className="cartTab">
        <div className="product">
            <button disabled >Product</button>
        </div>
        <div className="details">
            {buttons.map((button, index) => (
                <button disabled className={`${button === "Product" ? "product": ''}`} key={index}>{button}</button>
            ))}
        </div>
    </div>
  )
}

const Options = ({quantity, onIncrement, onDecrement}) => {
    return (
        <div className="options">
            <button onClick={onDecrement}>-</button>
            <p>{quantity}</p>
            <button onClick={onIncrement}>+</button>
        </div>
    )
}

Options.propTypes = {
    quantity: assignTypes.number,
    onIncrement: assignTypes.function,
    onDecrement: assignTypes.function
}

const CartItemCard = ({item}) => {

  const {_id, productName, size, price, quantity} = item;
  const amount = quantity * price;
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(updateQuantity(_id, 1));
  }

  const handleDecrement = () => {
    dispatch(updateQuantity(_id, -1));
  }

  return (
    <div className="cartItemCard">  
      <div className="product">
        <div className="imgFrame">
            <img src="" alt="" />
        </div>
        <div className="fragDetails">
            <p>{productName}</p>
            <p>{size}</p>
      </div>
      </div>
      
      <div className="details">
        <p>₱ {price}</p>
        <Options quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement}/>
        <p>₱ {amount}</p>
        <button className="action">Delete</button>
      </div>
    </div>
  )
}

CartItemCard.propTypes = {
  item: PropTypes.shape({
    _id: assignTypes.string,
    productName: assignTypes.string,
    size: assignTypes.string,
    price: assignTypes.number,
    quantity: assignTypes.number
  })
}


const CartItems = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const getCart = async (token) => {
      try {
        console.log("Fetcing Cart");

        const response = await axios.get( 
          backendRoutes.cart.getCart,
          {headers: {
            Authorization : `Bearer ${token}`
          }}
        )

        if(!response.data) {
          console.log("Error Fetching Cart");
          return
        }

        const {data} = response.data;

        if(!Array.isArray(data)) {
          console.log("Error: Cart is not an Array");
          return;
        }

        dispatch(updateWholeCart(data));

      } catch (error) {
        console.log("Error Fetching Cart", error)
      }
    }

    const updateCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if(cart.length === 0) { 
          console.log("Cart is Empty")
          await getCart(token);
          return;
        }

        console.log("Updating Cart")
        const formatCart = cart.map((item) => {

          let id = '';

          //check if productId is populated or not
          if(typeof(item.productId) === 'object') {
            // console.log("productId is an object: ", JSON.stringify(item.productId._id, null, 2));
            id = item.productId._id;
          } else {
            // console.log("not an object", JSON.stringify(item.productId, null, 2))
            id = item.productId
          }
          
          return{
            productId: id, //two data different format, object and a string due to populate in backend
            quantity: item.quantity,
            price: item.price,
            amount: item.price * item.quantity
          }
        })
      
        const response = await axios.patch(
          backendRoutes.cart.updateAndGetCart,
          {cart: formatCart},
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        )

        if(!response.data) {
          console.log("Error Fetching Cart");
          return
        }

        const {data} = response.data;
        if(!Array.isArray(data)) {
          console.log("Error: Cart is not an Array");
          return;
        }

        dispatch(updateWholeCart(data));

      } catch (error) {
        console.error("Error Getting Cart Data", error);
      } finally {
        setLoading(false)
      }
    }

      useEffect(() => {
        updateCart();
    },[])

  

  if(loading) {
    return (
      <Loader/>
    )
  }


  return (
    <div className="container cart">
        <Divider title="Cart"/>
        <CartTab/>
        <div className="cartContainer">
            {cart.length === 0 ? (
              <p className="mess">No items added in cart yet</p>
            ) :(
              cart.map((item, index) => (
                <CartItemCard key={index} item={{
                  _id: item.productId._id,
                  price: item.price,
                  quantity: item.quantity,
                  productName: item.productId.productName,
                  size: item.productId.size
                }}/>
              ))
            )}
           
        </div>
       
    </div>
  )
}

export default CartItems
