const { MonthlyRevenueCount } = require('../../models/counter/revenueCountModel');
const { MonthlyUserCount } = require('../../models/counter/userCountModel');
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

        if(totalUser.length === 0 || totalRevenue.length === 0) {
            return res.status(404).json({
                code: 'GTL_001',
                message: "Some total data is not found"
            })
        }

        return res.status(200).json({
            totalUser: totalUser[0].total,
            totalRevenue: totalRevenue[0].total
        })
       
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTotal,

}