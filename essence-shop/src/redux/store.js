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
                cart: state.cart.filter(item => item.productId._id !== action.payload),
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
                cart: state.cart.map((item) => {
                    if (item.productId._id === action.payload.id) {
                        const newQuantity = item.quantity + action.payload.value;
                        if (newQuantity < 0) {
                            return {
                                ...item,
                                quantity: 0, // Explicitly set to 0 if it goes negative
                            };
                        }
                        return {
                            ...item,
                            quantity: newQuantity > item.productId.quantity 
                                ? item.productId.quantity // Cap to available stock
                                : newQuantity, // Update to the new quantity
                        };
                    }
                    return item; // Return the unchanged item if it doesn't match
                }),
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
