const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Sales = require('../models/salesModel');
const logger = require('../utils/logger');
const { monthToInt, getWeekOfMonth } = require('../helpers/date');
const { updateRevenueHelper } = require('./counter/revenueCounterController');

const getSales = async (req, res, next) => {
    try {

        logger.Event("Get Sales Started");
        const {userId} = req;
        
        const sales = await Sales.find({sellerId: userId})
        .populate('sellerId')
        .populate('productId')
        .populate('orderId');

        if(!sales.length === 0 || !sales) {
            return res.status(404).json({
                code: 'GTO_001',
                message: "Seller has not sold any products yet"
            })
        }

        const completeSales = sales.filter(sales => sales.status === "Completed");
        const refundSales = sales.filter(sales => sales.status === "Refunded");
        const cancelledSales = sales.filter(sales => sales.status === "Cancelled");
        const pendingSales = sales.filter(sales => sales.status === "Pending");

        logger.Success("Successfully Fetch Sales");

        if(completeSales.length === 0 && refundSales.length === 0 && cancelledSales.length === 0 && pendingSales.length === 0) {
            return res.status(404).json({
                code: 'GTO_002',
                message: "Sales not found for this user"
            })
        }

        return res.status(200).json({
            code: "GTO_000",
            message: "Successfully Fetch Sales",
            data: {
                completed: completeSales,
                refunded: refundSales,
                cancelled: cancelledSales,
                pending: pendingSales
            }
        })

    } catch (error) {
        next(error)
    }
}


const updateSalesStatus = async (req, res, next) => {
    // Start MongoDB session for transaction so if one of the query fails, the updates can be roll back 
    // const session =   await mongoose.startSession(); uncomment this if deploy
    try { 

        logger.Event("Update Sales Status Started");

        const {
            status,
            orderId,
        } = req.body;

        const {id: salesId} = req.params;

        const {userId: id} = req;


        if(!orderId || !status || !salesId) {
            return res.status(400).json({
                code: 'USS_001',
                message: "Invalid Fields for Update Sales"
            })
        }

        const statusValue = ['Completed', 'Refunded', 'Refunded', 'Cancelled'];

        if(!statusValue.includes(status)) {
            return res.status(400).json({
                code: 'USS_002',
                message: "Invalid Status Value"
            })
        }

        // session.startTransaction(); uncomment this if deploy

        const orderResult = await Order.findByIdAndUpdate(
            orderId,
            {status},
            {new: true}
            // {new: true, session} uncomment this if deploy
        )

           // Check if order update was successful, if not, abort the transaction
        if (!orderResult) {
            // await session.abortTransaction(); // Abort the transaction uncomment this if deploy
            return res.status(404).json({
                code: 'USS_003',
                message: "Order Not Found"
            });
        }

        const salesResult = await Sales.findOneAndUpdate(
            {_id: salesId, sellerId: id},
            {status},
            {new: true}
            // {new: true, session} uncomment this if deploy
        )

        if (!salesResult) {
              // If either update fails, abort transaction / updates
            // await session.abortTransaction(); uncomment this if deploy
            return res.status(404).json({
                code: 'USS_004',
                message: "Sales Not Found"
            })
        }

        // Commit transaction if both updates are successful
        // await session.commitTransaction(); uncomment this if deploy 

        const {month, year, day, price, quantity} = orderResult;
        const week = getWeekOfMonth(month, day, year);
        const monthInt = monthToInt[month];
        const totalRevenue = quantity * price * 0.10

        const { weeklyResult } = await updateRevenueHelper(res, monthInt, year, day, week, totalRevenue);
       
        if(!weeklyResult) {
            // if(triggerSession) await session.abortTransaction();  // Abort if updating weekly revenue fails
            return res.status(500).json({
                code: 'UOS_005',
                message: "Failed to Update Weekly Revenue Count",
            });
        }


        logger.Success("Successfully Updated the Sales and Order Status")

        return res.status(200).json({
            code: 'USS_000',
            message: "Successfully Updated the Sales and Order Status",
            data: {
                sales: salesResult,
                order: orderResult,
                revenue: weeklyResult
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
    getSales,
    updateSalesStatus,
}