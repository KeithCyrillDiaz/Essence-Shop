const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const logger = require('../utils/logger');


const getOrders = async (req, res, next) => {
    try {

        logger.Event("Get Orders Started");

        const {userId} = req;
        
        const orders = await Order.find({userId: userId})
        .populate('userId')
        .populate('productId');

        if(!orders.length === 0 || !orders) {
            return res.status(404).json({
                code: 'GTO_001'
            })
        }

        const completeOrders = orders.filter(order => order.status === "Completed");
        const refundOrders = orders.filter(order => order.status === "Refund");
        const cancelledOrders = orders.filter(order => order.status === "Cancelled");

        logger.Success("Successfully Fetch Orders");

        return res.status(200).json({
            code: "GTO_000",
            message: "Successfully Fetch Orders",
            data: {
                complete: completeOrders,
                refund: refundOrders,
                cancelled: cancelledOrders
            }
        })

    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {

        logger.Event("Create Order Started");
        const orders = req.body;
    

        if (!Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({
                code: 'CRD_001',
                message: 'No orders provided'
            });
        }

        const {userId} = req;


        //checking if products is existing in database
        const productExistenceChecks = [];
        for (const order of orders) {
            console.log(`order: ${JSON.stringify(order, null, 2)}`);
            const { productId, status, quantity, price } = order;
            console.log("", order.productId)
            if (!productId || !status || !quantity || !price ) {
                return res.status(400).json({
                    code: 'CRD_002',
                    message: 'Invalid fields for orders'
                });
            }
        
            if (order.status !== 'Completed') {
                return res.status(400).json({
                    code: 'CRD_003',
                    message: "Invalid order status",
                });
            }
        
            order.userId = userId;
        
            // adding the existence check promise to the array with no waiting then await later
            const existenceCheckPromise = Product.exists({ _id: productId });
            productExistenceChecks.push(existenceCheckPromise);
        }
        
        // Wait for all the checks to complete in parallel
        const existenceResults = await Promise.all(productExistenceChecks);

        // Check each result after all promises have resolved
        for (let i = 0; i < orders.length; i++) {
            const result = existenceResults[i];
            if (!result) {
                return res.status(400).json({
                    code: 'CRD_004',
                    message: `Product Not Found on order below`,
                    order: orders[i]
                });
            }
        }

        //set up the querry for bulkWrite method of MongoDB to update the quantity
        const updateOperations = orders.map((order) => {
            const { productId, quantity } = order;
      
            // Prepare the update object to reduce the quantity
            return {
              updateOne: {
                filter: { _id: productId }, // Find product by productId
                update: { $inc: { quantity: -quantity } }, // Decrease quantity by amount
              }
            };
          });

       
        const orderResult = await Order.insertMany(orders);

        if(!orderResult) {
            return res.status(500).json({
                code: 'CRD_002',
                message: "Internal Server Error"
            })
        }

        const result = await Product.bulkWrite(updateOperations);

        if (!result || !result.modifiedCount) {
          return res.status(500).json({
              code: 'CRD_005',
              message: "Failed to update product quantities. No documents were modified."
          });
      }

        logger.Success(`Successfully created orders and updated quantities for products.`);

        return res.status(201).json({
            code: 'CRD_000',
            message: "Successfully created orders and updated quantities for products.",
            data: {
                products: result,
                orders: orderResult
            }
        })

    } catch (error) {
        next(error);
    }
}


module.exports = {
    getOrders,
    createOrder,
}