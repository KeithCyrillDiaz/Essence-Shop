
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addOrderItem, updateQuantity } from '../redux/actions';

const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const handleAddToCart = (item) => {
        if(!item) return
    
        const checkIfItemExist = cart.find((product) => product.productId._id === item._id)

        if(checkIfItemExist) {
            console.log("Item is Existing, adding quantity instead");
            dispatch(updateQuantity(item._id, 1));
            return
        }

        const formatItem = {
            productId: item._id,
            quantity: 1,
            price: item.price,
        }

        item.dummyId = Date.now();
        item.placeOrder = false
        dispatch(addItem(formatItem));
        return;
    }

    const handleBuyNow = (item) => {
        if(!item) return
        item.dummyId = Date.now();
        item.placeOrder = true
        dispatch(addOrderItem(item));
        return;
    }

    return {
        handleAddToCart,
        handleBuyNow
    }

}

export default useCart
