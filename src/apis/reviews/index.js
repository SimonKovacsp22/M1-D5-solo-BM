import express from 'express'
import {postReviewForProduct ,getReviewsForProduct,updateReview,deleteReview,getSingleReview} from '../../lib/reviews-utilities.js'



const reviewsRouter = express.Router()

reviewsRouter.post("/:product_id/reviews",postReviewForProduct)

reviewsRouter.get("/:product_id/reviews",getReviewsForProduct)

reviewsRouter.get("/reviews/:id",getSingleReview)

reviewsRouter.put("/reviews/:id",updateReview)

reviewsRouter.delete("/:product_id/reviews/:id",deleteReview)

export default reviewsRouter