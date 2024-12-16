const { getReviewsByProductId, createReview, updateReviewById, deleteReviewById } = require("../controllers/reviewController")

module.exports = (router) => {
      //protected routes
    router.get('/user/reviews/get/:id', getReviewsByProductId);

    router.post('/user/reviews/create', createReview);

    router.put('/user/reviews/update/:id', updateReviewById);

    router.delete('/user/reviews/delete/:id', deleteReviewById);
}