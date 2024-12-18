
const { countDocuments } = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const logger = require('../utils/logger');


const createProduct = async (req, res, next) => {
    try {

        logger.Event("Create Product Started");

        const {userId} = req;
        const {
            price,
            size,
            productName,
            topNotes,
            middleNotes,
            baseNotes,
            brand,
            longevity,
            projection,
            occasion,
            bestFor,
            quantity
        } = req.body;

        if(!size || !price || !productName || !topNotes || !middleNotes || !baseNotes || !brand || !longevity || !projection || !occasion || !bestFor || !quantity) {
            return res.status(400).json({
                code: 'CTP_001',
                message: "field missing"
            })
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                code: 'CTP_002',
                message: "User not found"
            })
        }

    

        const updates = {...req.body, userId};
        const newProduct = new Product(updates)

        const result = await newProduct.save();

        if(!result) {
            return res.status(500).json({
                code: "CTP_003",
                message: "Failed to create product"
            })
        }
        logger.Success("Product Created Succesfully")

        user.multiRole=true;
       const updatedUser = await user.save();

       if(!updatedUser) {
        return res.status(500).json({
            code: 'CTP_004',
             message: "Failed to update user's multiRole field"
        })
       }

       const productCount = await Product.countDocuments({userId});

       const value = productCount + 1;

       const userResult = await User.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    productCount: value
                }
            },
            {new: true}
       )

       if(!userResult) {
        return res.status.json({
            code: "CTP_005",
            message: "Failed to Update Product Count on user"
        })
       }

        return res.status(201).json({
            code: "CTP_000",
            message: "Product Created Succesfully",
            data: {
                productData: result,
                userData: updatedUser 
            }
        })

    } catch (error) {
        next(error);
    }
}

const getAllproducts = async (req, res, next) => {
    try {

        logger.Event("Get All Products Started");

        const result = await Product.find();

        if(result.length === 0) {
            return res.status(404).json({
                code: 'GAP_001',
                message: "No Products Found"
            })
        }

        logger.Success("Successfully Retrieved Products");

        return res.status(200).json({
            code: 'GAP_000',
            message: "Successfully Retrieved Products",
            data: result
        })

    } catch (error) {
        next(error);
    }
}


const getProduct = async (req, res, next) => {
    try {

        logger.Event("Get Product Started");

        const {userId} = req;
        const result = await Product.find({userId: userId});

        if(result.length === 0) {
            return res.status(404).json({
                code: 'GTP_001',
                message: "No Products Found"
            })
        }

        logger.Success("Successfully Fetched Products");

        return res.status(200).json({
            code: 'GTP_000',
            message: "Successfully Fetched Products",
            data: result
        })

    } catch (error) {
        next(error);
    }
}

const getProductsById = async (req, res, next) => {
    try {

        logger.Event("Get Product by id Started");
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({
                code: 'GPID_001',
                message: "Invalid Parameters"
            })
        }

        const result = await Product.find({userId: id}).populate('userId');
        if(result.length === 0) {
            return res.status(404).json({
                 code: 'GPID_002',
                message: "No Products Found"
            })
        }

        logger.Success("Successfully Retrieved Products");

        return res.status(200).json({
            code: 'GPID_000',
            message: "Successfully Retrieved Products",
            data: result
        })
        

    } catch (error) {
        next(error)
    }
}


const updateProductById = async (req, res, next) => {
    try {
        logger.Event("Edit Product Started");
        const {id} = req.params;
        const {
            price,
            size,
            productName,
            topNotes,
            middleNotes,
            baseNotes,
            brand,
            longevity,
            projection,
            occasion,
            bestFor,
        } = req.body;

        if(!price || !size || !productName || !topNotes || !middleNotes || !baseNotes || !brand || !longevity || !projection || !occasion || !bestFor) {
            return res.status(400).json({
                code: 'EDPT_001',
                message: "Some Product Fields are invalid"
            })
        }

        const updates = req.body;
        const result = await Product.findByIdAndUpdate(
            id,
            updates,
            {new: true}
        )

        if(!result) {
            return res.status(404).json({
                code: 'EDPT_002',
                message: "Product Not found. Check Product Id"
            })
        }

        logger.Success("Sucessfully Updated the Product");

        return res.status(200).json({
            code: 'EDPT_000',
            message: "Sucessfully Updated the Product",
            data: result
        })


    } catch (error) {
        next(error);
    }
}

const deleteProductById = async (req, res, next) => {
    try {

        logger.Event("Deleted Product By Id Started");
        
        const {id} = req.params;
        const {userId} = req;

        if(!id) {
            return res.status(400).json({
                code: 'DPID_001',
                message: "Invalid Id"
            })
        }

        const checkProduct = await Product.findById(id);

        if(!checkProduct) {
            return res.status(404).json({
                code: 'DPID_002',
                message: "Product Not Found"
            })
        }

        const ownerId = checkProduct.userId;

        if(!ownerId !== userId) {
            return res.status(401).json({
                code: 'DPID_003',
                message: "User is not the owner of the product"
            })
        }
      
        const result = await Product.findByIdAndDelete(id);
        if(!result) {
            return res.status(500).json({
                code: 'DPID_003',
                message: "Something Went Wrong PLease Try Again"
            })
        }


        logger.Success("Successfull Delete the Product");

        return res.status(200).json({
            code: "DPID_000",
            message: "Successfull Delete the Product",
            data: result
        })

    } catch (error) {
        next(error);
    }
}

const getBestSellers = async (req, res, next) => {
    try {

        logger.Event("Get Best Sellers Started");
        const result = await Product.aggregate([
            {
              // Step 1: Calculate the dynamic rating by dividing the rating by totalRating
              $addFields: {
                dynamicRating: { $cond: { if: { $eq: ["$totalRating", 0] }, then: 0, else: { $divide: ["$rating", "$totalRating"] } } }
              }
            },
            {
              // Step 2: Filter products where the calculated rating is >= 4
              $match: { dynamicRating: { $gte: 4 } }
            },
            {
              // Step 3: Sort by the dynamicRating in descending order
              $sort: { dynamicRating: -1 }
            },
            {
              // Step 4: Limit the results to the top 5
              $limit: 5
            }
          ]).exec();


        if(!result) {
            return res.status(404).json({
                code: 'GBS_001',
                message: "No Products with rating of  Found"
            })
        }

        return res.status(200).json({
            code: 'GBS_000',
            message: "Succesfully Fetched Best Sellers",
            data: result
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProductsById,
    updateProductById,
    deleteProductById,
    getBestSellers,
    getAllproducts
}