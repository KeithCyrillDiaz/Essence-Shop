const Order = require('../models/orderModel');
const logger = require('../utils/logger');


const getOrders = async (req, res, next) => {
    try {

        logger.Event("Get Orders Started");

        const {userId} = req;
        
        const orders = await Order.find({userId})
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

        const result = await Order.insertMany(orders);

        if(!result) {
            return res.status(500).json({
                code: 'CRD_002',
                message: "Internal Server Error"
            })
        }

        logger.Success("Successfully Inserted Orders");

        return res.status(201).json({
            code: 'CRD_000',
            message: "Successfully Inserted Orders",
            data: result
        })

    } catch (error) {
        next(error);
    }
}


module.exports = {
    getOrders,
    createOrder,
}