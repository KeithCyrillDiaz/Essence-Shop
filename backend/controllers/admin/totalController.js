const { MonthlyRevenueCount } = require('../../models/counter/revenueCountModel');
const { MonthlyUserCount } = require('../../models/counter/userCountModel');
const Order = require('../../models/orderModel');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');
const logger = require('../../utils/logger');


const getTotal = async (req, res, next) => {
    try {

        logger.Event("Get Total Started");

        const totalUser = await MonthlyUserCount.aggregate([
            {$unwind: "$weeklyUserCounts"},
            {$group: {
                _id: null,
                total: {$sum: "$weeklyUserCounts.userCount"}
            }}
        ])

        const totalRevenue = await MonthlyRevenueCount.aggregate([
            {$unwind: "$weeklyRevenueCounts"},
            {$group: {
                _id: null,
                total: {$sum: "$weeklyRevenueCounts.revenueCount"}
            }}
        ])

        const totalProducts = await Product.countDocuments(
            {quantity: {$gte: 1}}
        );
        const totalOrders = await Order.countDocuments(
            {status: 'Completed'}
        );
        const totalSellers = await User.countDocuments(
            {multiRole: true}
        );

        return res.status(200).json({
            code: 'GTL_000',
            message: "Successfully Retrieve totals",
            data: {
                user: totalUser[0]?.total ?? 0,
                revenue: totalRevenue[0]?.total ?? 0,
                product: totalProducts ?? 0,
                order: totalOrders ?? 0,
                seller: totalSellers ?? 0
            }
        })
       
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTotal,

}