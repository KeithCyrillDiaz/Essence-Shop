const { MonthlyRevenueCount } = require('../../models/counter/revenueCountModel');
const { MonthlyUserCount } = require('../../models/counter/userCountModel');
const Order = require('../../models/orderModel');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');
const logger = require('../../utils/logger');


const getTotal = async (req, res, next) => {
    try {

        logger.Event("Get Total Started");

        const totalUser = await User.countDocuments();

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
                Users: totalUser ?? 0,
                Sellers: totalSellers ?? 0,
                Revenue: totalRevenue[0]?.total ?? 0,
                Orders: totalOrders ?? 0,
                Products: totalProducts ?? 0,
             
               
            }
        })
       
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTotal,

}