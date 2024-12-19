
import { useDispatch } from 'react-redux';
import { addItem, addOrderItem } from '../redux/actions';

const useCart = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        if(!item) return
        item.dummyId = Date.now();
        item.placeOrder = false
        dispatch(addItem(item));
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
