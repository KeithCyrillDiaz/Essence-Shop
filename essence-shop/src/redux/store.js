import { createStore } from 'redux';

// Initial state holds an array of objects
const initialState = {
    cart: [],
    order: [],
    cloudCartCount: 0,
    localCartCount: 0
};

// Reducer to handle actions on the array of objects
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return { 
                ...state, 
                cart: [...state.cart, action.payload],
                localCartCount: state.localCartCount + 1
            };
        
        case 'REMOVE_ITEM':
            return { 
                ...state, 
                cart: state.cart.filter(item => item.id !== action.payload),
                localCartCount: state.localCartCount - 1
            };
        
        case 'UPDATE_ITEM':
            return { 
                ...state, 
                cart: state.cart.map(item => 
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                ) 
            };

        case 'ADD_ORDER_ITEM': 
            return {
                ...state,
                order: [
                    ...state.order,
                    action.payload
                ]
            }
        
        case 'UPDATE_CLOUD_CART_COUNT':
            return {
                ...state,
                cloudCartCount: action.payload
            }

        case 'UPDATE_QUANTITY': 
            return {
                ...state,
                cart: state.cart.map((item) => ({
                    ...item,
                    quantity: item.productId._id === action.payload.id ?  item.quantity + action.payload.value : item.quantity
                }))
            }
        case 'UPDATE_WHOLE_CART':
            return {
                ...state,
                cart: action.payload
            }
        
        default:
            return state;
    }
};

// Create the store
const store = createStore(reducer);

export default store;
