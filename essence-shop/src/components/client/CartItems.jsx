
import { useEffect, useState } from "react";
import assignTypes from "../../constant/PropTypes"
import Divider from "../Divider"
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Loader";
import axios from "axios";
import backendRoutes from "../../routes/backendROutes";
import { updateWholeCart, updateQuantity, removeItem } from "../../redux/actions";
import PropTypes from "prop-types";
import { Perfumes } from "../../assets";
import { SessionExpired } from "..";

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

  const {_id, productName, size, price, quantity, brand, imageOf} = item;
  const amount = quantity * price;
  const uri = Perfumes?.[brand]?.[imageOf];

  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(updateQuantity(_id, 1));
  }

  const handleDecrement = () => {
    dispatch(updateQuantity(_id, -1));
  }

  const handleDeleteItem =  () => {
    dispatch(removeItem(_id));
    if(cart.length === 1) deleteCloudCart();
  }

  const deleteCloudCart = async () => {
    try {
        console.log("No items in cart, deleting cart in cloud");
        const token = localStorage.getItem('token');

        if(!token) {
          setIsSessionExpired(true);
          return
        }
        
        const response = await axios.delete(
          backendRoutes.cart.deleteCart,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        )

        if(response.status === 401){
          setIsSessionExpired(true);
          return
        }

        
    } catch (error) {
      console.log("Error Deleting Cart", error);
    }
  }

  return (
    <div className="cartItemCard">  
        {isSessionExpired && <SessionExpired/>}
      <div className="product">
        <div className="imgFrame">
            <img src={uri} alt="" />
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
        <div className="buttons">
          <button onClick={{}} className="action gold">View</button>
          <button onClick={handleDeleteItem} className="action">Delete</button>
        </div>
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
    quantity: assignTypes.number,
    brand: assignTypes.string,
    imageOf: assignTypes.string
  })
}


const CartItems = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const reformatCartForRequest = () => {

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
          amount: item.price * item.quantity,
          status: "Pending"
        }
      })

      return formatCart;

    }


    const getCart = async (token) => {
      try {
        console.log("Fetcing Cart");

        const response = await axios.get( 
          backendRoutes.cart.getCart,
          {headers: {
            Authorization : `Bearer ${token}`
          }}
        )

        
        if(response.status === 401){
          setIsSessionExpired(true);
          return
        }

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
        if(!token) {
          setIsSessionExpired(true);
          return
        }

        if(cart.length === 0) { 
          console.log("Cart is Empty")
          await getCart(token);
          return;
        }

        console.log("Updating Cart")
       
        const formatCart = reformatCartForRequest();

        const response = await axios.patch(
          backendRoutes.cart.updateAndGetCart,
          {cart: formatCart},
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        )

        
        if(response.status === 401){
          setIsSessionExpired(true);
          return
        }

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


    const handleCheckout = async () => {
      try {
          setLoading(true);
          console.log("Checking Out");
          const token = localStorage.getItem('token');
          if(!token) {
            setIsSessionExpired(true);
            return
          }

          const formatCart = reformatCartForRequest();

          if (!Array.isArray(formatCart)) {
            console.log("Items is not an array");
            return; 
          }
    
          console.log("Order Data: ", JSON.stringify(formatCart, null, 2));
    
          const response = await axios.post(
            backendRoutes.order.createOrder,
            formatCart,
            {headers: {
              Authorization: `Bearer ${token}`
            }}
          )

          
          if(response.status === 401){
            setIsSessionExpired(true);
            return
          }

          if(!response.data){
            console.log("Failed Fetching Data");
            return
          }
    
          await axios.delete(
            backendRoutes.cart.deleteCart,
            {headers: {
              Authorization: `Bearer ${token}`
            }}
          )

          dispatch(updateWholeCart([]));
          // window.location.reload();
          
      } catch (error) {
        console.log("Error Checking Out", error)
      } finally {
        setLoading(false)
      }
    }
  

  if(loading) {
    return (
      <Loader/>
    )
  }


  return (
    <div className="container cart">
        {isSessionExpired && <SessionExpired/>}
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
                  size: item.productId.size,
                  brand: item.productId.brand,
                  imageOf: item.productId.imageOf
                }}/>
              ))
            )}
        </div>
        <div className="bottomTab">
          <div className="total">
            <h2>Total</h2>
          </div>
          <div className="checkoutDetails">
            <div className="details">
              <div className="left">
                <p><strong>Item:</strong></p>
                <p><strong>Amount:</strong></p>
              </div>
              <div className="right">
                <p><strong>{totalQuantity}</strong></p>
                <p><strong>₱ {totalAmount}</strong></p>
              </div>
            </div>
            <button onClick={handleCheckout}>CHECKOUT</button>
          </div>
        </div>
    </div>
  )
}

export default CartItems
