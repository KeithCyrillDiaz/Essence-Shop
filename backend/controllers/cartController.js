
const Cart = require('../models/cartModel');
const logger = require('../utils/logger');


const getCartItems = async (req, res, next) => {
    try {
        logger.Event("Get Cart Items Started");

        const {userId} = req;
        const result = await Cart.findOne({userId}).populate('items.productId');

        if(!result) {
            return res.status(404).json({
                code: 'GCT_001',
                message: "Cart not found of the current logged in user"
            })
        }

        logger.Success("Successfully Retrieved Cart Data");
        const {items} = result;

        const fragrances = items.map((item) => item);
       
        return res.status(200).json({
            code: 'GTC_000',
            message: "Successfully Retrieved Cart Data",
            data: fragrances
        })

    } catch (error) {
        next(error);
    }
}


const updateCart = async (req, res, next) => {
    try {
        logger.Event("Update Cart Started");

        const {cart} = req.body;
        const {userId} = req;


        if (!Array.isArray(cart)) {
            return res.status(400).json({
                code: 'UCT_001',
                message: "Cart must be an array of objects"
            });
        }

        const requiredFields = ['productId', 'price', 'quantity', 'amount'];

        for (const item of cart) {
            for (const field of requiredFields) {
                if (!item.hasOwnProperty(field)) {
                    return res.status(400).json({
                        code: 'UCT_002',
                        message: `Missing field '${field}' in cart item`
                    });
                }
            }
        }
        logger.Event("test");
    
        const totalPrice = cart.reduce((acc, item) => {
            // Ensure amount is a number before summing
            return acc + (typeof item.amount === 'number' ? item.amount : 0);
        }, 0);


        const result = await Cart.findOneAndUpdate(
            {userId},
            {
                items: cart,
                totalPrice,
            },
            {new: true}
        ).populate('items.productId');

        if(!result) {

                logger.Event("No cart found. Adding New Cart")
                const newCart = new Cart({
                    userId,
                    items: cart,
                    totalPrice
                })

                const result = await newCart.save();

                if(!result) {
                    return res.status(500).json({
                        code: 'UCT_003',
                        message: "Failed Creating New Cart, please try again later"
                    })
                }

                await result.populate('items.productId');

                const items = result.items.map((item)=> item);
              
                
                logger.Success("Successfully Created New Cart");
                return res.status(201).json({
                    code: 'UCT_000',
                    message: "Successfully Created New Cart",
                    data: items
                })
        }

        const items = result.items.map((item)=> item);
     

        logger.Success("Successfully Updated Cart");
        console.log("items: ", JSON.stringify(items, null, 2))

        return res.status(200).json({
            code: 'UCT_000',
            message: "Successfully Updated Cart",
            data: items
        })

    } catch (error) {
        next(error);
    }
}


const deleteCart = async (req, res, next) => {
    try {
        logger.Event("Delete Cart is Started");

        const {userId} = req;

        const result = await Cart.findOneAndDelete({userId});

        logger.Success("Sucessfully Delted Cart");

        if(!result) {
            return res.status(404).json({
                code: 'DCT_001',
                message: "Cart Not Found"
            })
        }

        return res.status(200).json({
            code: 'DCT_000',
            message: "Sucessfully Delted Cart"
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCartItems,
    updateCart,
    deleteCart
}