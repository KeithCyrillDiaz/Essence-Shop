
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

module.exports = {
    createProduct,
    getProduct,
    getProductsById,
    updateProductById
}