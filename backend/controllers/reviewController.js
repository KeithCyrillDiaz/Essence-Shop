
const Product = require('../models/productModel');
const Review = require('../models/reviewsmodel');
const logger = require('../utils/logger');


const getReviewsByProductId = async (req, res, next) => {
    try {

        logger.Event("Get Reviews By Product ID Started")
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({
                code: 'GRPD_001',
                message: "Invalid Id Parameter"
            })
        }

        const result = await Review.find({productId: id})
        .populate("userId")
        .populate("productId");

        if(result.length === 0) {
            return res.status(404).json({
                code: 'GRPD_002',
                message: "No Reviews Found for this Product"
            })
        }

        logger.Success("Successfuly Fetched Reviews");

        return res.status(200).json({
            code: 'GRPD_000',
            message: "Successfuly Fetched Reviews",
            data: result
        })

    } catch (error) {
        next(error);
    }
}

const createReview = async (req, res, next) => {
    try {

        logger.Event("Create Reviews Started");
        const {
            productId,
            content,
            rating
        } = req.body;

        const {userId} = req;

        if(!productId || !content || !rating) {
            return res.status(400).json({
                code: 'CTR_001',
                message: "Invalid Fields for Reviews"
            })
        }
        
        const checkProduct = await Product.findById(productId);

        if(!checkProduct) {
            return res.status(404).json({
                code: 'CTR_002',
                message: "Product Not Found"
            })
        }

        const newData = new Review({
            userId,
            productId,
            content,
            rating,
        })

        const result = await newData.save();

        if(!result) {
            return res.status(500).json({
                code: 'CTR_003',
                message: "Something Went Wrong. Please Try Again"
            })
        }

        logger.Success("Successfully Created Product");

        return res.status(201).json({
            code: 'CTR_000',
            message: "Successfully Created Product",
            data: result
        })

    } catch (error) {
       next(error);
    }
}

const deleteReviewById = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        if(!id) {
            return res.status(400).json({
                code: 'DRID_001',
                message: "Please input an Id for the review"
            })
        }

        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({
                code: 'DRID_002',
                message: "Review Not Found"
            })
        }

        logger.Success("Successfully Deleted Review");
        
        return res.status(200).json({
            code: 'DRID_000',
            message: "Successfully Deleted Review",
            result
        })

    } catch (error) {
        next(error);
    }
}


const updateReviewById = async (req, res, next) => {
    try {

        logger.Event("Update Review By Id Started");
        const {
            productId,
            content,
            rating
        } = req.body;

        const {id} = req.params;
        const {userId} = req;

        if(!content || !rating || !id || !productId) {
            return res.status(400).json({
                code: 'URID_001',
                message: "Invalid Fields for Reviews"
            })
        }

        const checkProduct = await Product.findById(productId);

        if(!checkProduct) {
              // Delete review if product no longer exists
            await Review.findByIdAndDelete(id);
            return res.status(404).json({
                code: 'URID_002',
                message: "The Product has been removed"
            })
        }

        const result = await Review.findByIdAndUpdate(
            id,
            {
                productId,
                content,
                rating
            },
            {new: true, runValidators: true}
        )

        if(!result) {
            return res.status(404).json({
                code: 'URID_003',
                message: "Review Not Found"
            })
        }

        logger.Success("Successfully Updated Review");

        return res.status(200).json({
            code: 'URID_000',
            message: "Successfully Updated Review",
            data: result
        })

        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getReviewsByProductId,
    createReview,
    deleteReviewById,
    updateReviewById
}