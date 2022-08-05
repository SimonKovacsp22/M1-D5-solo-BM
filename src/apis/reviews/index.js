import express from 'express'
import {postReviewForProduct ,getReviewsForProduct,updateReview,deleteReview,getSingleReview} from '../../lib/reviews-utilities.js'
import { checkReviewSchema } from './validation.js'
import { checkValidationResult } from '../products/validation.js'


const reviewsRouter = express.Router()

reviewsRouter.post("/:product_id/reviews",checkReviewSchema,checkValidationResult,postReviewForProduct)

reviewsRouter.get("/:product_id/reviews",getReviewsForProduct)

reviewsRouter.get("/:product_id/reviews/:id",getSingleReview)

reviewsRouter.put("/reviews/:id",updateReview)

reviewsRouter.delete("/reviews/:id",deleteReview)

export default reviewsRouter