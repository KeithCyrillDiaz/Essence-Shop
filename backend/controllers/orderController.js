const mongoose  = require('mongoose');
const { getCurrentDate, monthToString, getWeekOfMonth, monthToInt } = require('../helpers/date');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Sales = require('../models/salesModel');
const logger = require('../utils/logger');
const { updateRevenueHelper } = require('./counter/revenueCounterController');


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
        const refundOrders = orders.filter(order => order.status === "Refunded");
        const cancelledOrders = orders.filter(order => order.status === "Cancelled");
        const pendingOrders = orders.filter(order => order.status === "Pending");

        logger.Success("Successfully Fetch Orders");

        if(completeOrders.length === 0 && refundOrders.length === 0 && cancelledOrders.length === 0 && pendingOrders.length === 0) {
            return res.status(404).json({
                code: 'GTO_002',
                message: "Orders not found for this user"
            })
        }


        return res.status(200).json({
            code: "GTO_000",
            message: "Successfully Fetch Orders",
            data: {
                complete: completeOrders,
                refund: refundOrders,
                cancelled: cancelledOrders,
                pending: pendingOrders
            }
        })

    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    
    const triggerSession = false // set to true if deploy #uncoment
    const session = triggerSession ? await mongoose.startSession() : null;  // Start a session for the transaction

    try {
        if(triggerSession)session.startTransaction();  // Begin the transaction

        logger.Event("Create Order Started");
        const orders = req.body;
    
        if (!Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({
                code: 'CRD_001',
                message: 'No orders provided'
            });
        }

        const {userId: buyerId} = req;
        const {month, day, year} = getCurrentDate();
        
        const stringMonth = monthToString[month - 1];

        const receiptId = new mongoose.Types.ObjectId();
        
        const products = [];
        const orderQuantities = [];
        for (const order of orders) {
            const { productId, status, quantity, price} = order;
            if (!productId || !status || !quantity || !price) {
                return res.status(400).json({
                    code: 'CRD_002',
                    message: 'Invalid fields for orders'
                });
            }

            if (order.status !== 'Pending') {
                return res.status(400).json({
                    code: 'CRD_003',
                    message: "Invalid order status",
                });
            }

            //concatenate Id's
            order.userId = buyerId;
            order.receiptId = receiptId;

            orderQuantities.push({
                dummyId: order.productId,
                orderedQuantity: order.quantity
            })

            const existenceCheckPromise = Product.find({ _id: productId }).populate('userId');
            products.push(existenceCheckPromise);
        }

        // Wait for all the checks to complete in parallel
        const existenceResults = await Promise.all(products);

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

        const updateOperations = orders.map((order) => {
            const { productId, quantity } = order;
            return {
              updateOne: {
                filter: { _id: productId },
                update: { $inc: { quantity: -quantity } },
              }
            };
        });

        const formatOrders = orders.map((order) => {
            return {
                ...order,
                month: stringMonth,
                day,
                year
            }
        });

        // Insert orders
        const orderResult = await Order.insertMany(formatOrders, triggerSession ?{ session } : {});
        if(!orderResult) {
            if(triggerSession)await session.abortTransaction();  // Abort the transaction if inserting orders fails
            return res.status(500).json({
                code: 'CRD_002',
                message: "Internal Server Error"
            });
        }

        // Bulk write to update product quantities
        const result = await Product.bulkWrite(updateOperations, triggerSession ?{ session } : {});
        if (!result || !result.modifiedCount) {
            if(triggerSession)await session.abortTransaction();  // Abort if no products were modified
            return res.status(500).json({
                code: 'CRD_005',
                message: "Failed to update product quantities. No documents were modified."
            });
        }

        // Prepare data for Sales
        const extractedData = existenceResults.flatMap(productGroup => 
            productGroup.map(product => {
                const { id, userId, quantity, price } = product;
                return {
                    productId: id, 
                    userId: userId.id,
                    quantity: quantity,
                    price: price,
                }
            })
        );

        const formattedData = extractedData.map((item) => {
            const { userId, productId, price } = item;
            const matchingOrder = orderResult.find((order) => 
                order.productId.equals(productId)
            );
            const orderId = matchingOrder ? matchingOrder._id : null;
            const order = orderQuantities.find((item) => item.dummyId === productId);
            return {
                receiptId,// id for locating the sales when orders are cancelled
                sellerId: userId,
                productId,
                orderId: orderId,
                quantity: order.orderedQuantity,
                status: "Pending",
                price,
                month: stringMonth,
                day,
                year
            }
        });

        // Insert Sales
        const salesResult = await Sales.insertMany(formattedData, triggerSession ?{ session } : {});
        if(!salesResult) {
            if(triggerSession)await session.abortTransaction();  // Abort if creating sales fails
            return res.status(500).json({
                code: 'CRD_006',
                message: "Failed To create Sales"
            });
        }

        // Calculate revenue and update weekly revenue
        // const totalRevenue = orders.reduce((acc, order) => {
        //     const { quantity, price } = order;
        //     const revenue = quantity * price * 0.1; // 10% of the total price
        //     return acc + revenue;
        // }, 0);

        // const { weeklyResult } = await updateRevenueHelper(res, month, year, day, week, totalRevenue);
        // if(!weeklyResult) {
        //     if(triggerSession) await session.abortTransaction();  // Abort if updating weekly revenue fails
        //     return res.status(500).json({
        //         code: 'CRD_007',
        //         message: "Failed to Update Weekly Revenue Count"
        //     });
        // }

        // Commit transaction
        if(triggerSession) await session.commitTransaction();

        logger.Success(`Successfully created orders and sales and updated quantities for products.`);

        return res.status(201).json({
            code: 'CRD_000',
            message: "Successfully created orders and sales and updated quantities for products.",
            data: {
                products: result,
                orders: orderResult,
                sales: salesResult,
            }
        });

    } catch (error) {
        // Abort the transaction if an error occurs
        // if (session.inTransaction() && triggerSession) {
        //     await session.abortTransaction();
        // }
        next(error);
    } finally {
        // End the session regardless of success or failure
        if(triggerSession) session.endSession();
    }
}


const   updateOrderStatus = async (req, res, next) => {

     // const session =   await mongoose.startSession(); uncomment this if deploy

    try {
        logger.Event("Update Order Status Started");

        const {status, receiptId} = req.body;
        const {id: productId} = req.params;
        const {userId} = req;

        if(!status || !receiptId || !productId) {
            return res.status(400).json({
                code: 'UOS_001',
                message: "Invalid Fields for updating Order Status"
            })
        }

        const statusValue = ['Return',  'Cancelled'];

        if(!statusValue.includes(status)) {
            return res.status(400).json({
                code: 'UOS_002',
                message: "Invalid Status Value"
            })
        }

        // session.startTransaction(); uncomment this if deploy

        const orderResult = await Order.findOneAndUpdate(
            {receiptId, productId, userId},
            {status},
            {new: true}
            // {new: true, session} uncomment this if deploy
        )

        if (!orderResult) {
            // await session.abortTransaction(); // Abort the transaction uncomment this if deploy
            return res.status(404).json({
                code: 'UOS_003',
                message: "Order Not Found"
            });
        }

        const salesResult = await Sales.findOneAndUpdate(
            {receiptId, productId},
            {status},
            {new: true}
            // {new: true, session} uncomment this if deploy
        )

        if (!salesResult) {
              // If either update fails, abort transaction / updates
            // await session.abortTransaction(); uncomment this if deploy
            return res.status(404).json({
                code: 'UOS_004',
                message: "Sales Not Found"
            })
        }

        //prepare the date for revenueCount

         // Commit transaction if both updates are successful
        // await session.commitTransaction(); uncomment this if deploy 


        logger.Success("Successfully Updated the Order and Sales  Status")

        return res.status(200).json({
            code: 'UOS_000',
            message: "Successfully Updated the Order and Sales Status",
            data: {
                sales: salesResult,
                order: orderResult
            }
        })

    } catch (error) {
        // Abort the transaction if an error occurs
     //    if (session.inTransaction()) { uncomment this if deploy
     //     await session.abortTransaction();
     // }
        next(error)
    } finally {
        // End the session regardless of success or failure
        // session.endSession(); uncomment this if deploy
    }
}


module.exports = {
    getOrders,
    createOrder,
    updateOrderStatus
}