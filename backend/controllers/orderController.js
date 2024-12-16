const { getCurrentDate, monthToString } = require('../helpers/date');
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
        const {month, day, year, week} = getCurrentDate();
        
        //convert to real month e.g January
        const stringMonth = monthToString[month -1];

        //checking if products is existing in database
        const products = [];
        for (const order of orders) {
            const { productId, status, quantity, price } = order;
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
            const existenceCheckPromise = Product.find({ _id: productId })
            .populate('userId');
            products.push(existenceCheckPromise);
        }
        
        // Wait for all the checks to complete in parallel
        const existenceResults = await Promise.all(products);

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

          const formatOrders = orders.map((order) => {
            return {
                ...order,
                month: stringMonth,
                day,
                year
            }
          })

       
        const orderResult = await Order.insertMany(formatOrders);

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


      //prepare querry for creating sales
      const extractedData = existenceResults.flatMap(productGroup => 
        productGroup.map(product => {
            const {id, userId, quantity, price} = product;
            return {
                productId: id, 
                userId: userId.id,  //userId is populated
                quantity: quantity,
                price: price,
              }
        })
      );

      //format the data to match the model of sales
      const formattedData = extractedData.map((item) => {
        const {userId, productId, quantity, price} = item
        return {
            userId,
            productId,
            quantity,
            status: "Completed",
            price,
            month: monthToString,
            day,
            year
          }
      })

      const salesResult = await Sales.insertMany(formattedData);

      if(!salesResult) {
        return res.status(500).json({
            code: 'CRD_006',
            message: "Failed To create Sales"
        })
      }
      
      
      console.log('data: ', orders);
      
      const totalRevenue = orders.reduce((acc, order) => {
        const { quantity, price } = order;
        const revenue = quantity * price * 0.1; // 10% of the total price
        return acc + revenue; // Accumulate the total revenue
    }, 0); 

    const {weeklyResult} = await updateRevenueHelper(res, month, year, day, week, totalRevenue);     
      
      if(!weeklyResult) {
        return res.status(500).json({
            code: 'CRD_007',
            message: "Failed to Update Weekly Revenue Count"
        })
      }

        logger.Success(`Successfully created orders and sales and updated quantities for products.`);

        return res.status(201).json({
            code: 'CRD_000',
            message: "Successfully created orders and sales and  updated quantities for products.",
            data: {
                products: result,
                orders: orderResult,
                sales: salesResult,
                revenue: weeklyResult
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