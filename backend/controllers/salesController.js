const Sales = require('../models/salesModel');
const logger = require('../utils/logger');


const getSales = async (req, res, next) => {
    try {

        logger.Event("Get Sales Started");

        const {userId} = req;
        
        const sales = await Sales.find({userId})
        .populate('userId')
        .populate('productId');

        if(!sales.length === 0 || !sales) {
            return res.status(404).json({
                code: 'GTO_001'
            })
        }

        const completeSales = sales.filter(sales => sales.status === "Completed");
        const refundSales = sales.filter(sales => sales.status === "Refund");
        const cancelledSales = sales.filter(sales => sales.status === "Cancelled");

        logger.Success("Successfully Fetch Sales");

        return res.status(200).json({
            code: "GTO_000",
            message: "Successfully Fetch Sales",
            data: {
                complete: completeSales,
                refund: refundSales,
                cancelled: cancelledSales
            }
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getSales,

}