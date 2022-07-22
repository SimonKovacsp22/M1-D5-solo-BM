import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Comment is a mandatory field and needs to be a string!",
    },
  },
  rate: {
    in: ["body"],
    isNumber: {
      errorMessage: "Rate is a mandatory field and needs to be a number!",
    },
  },
}


export const checkReviewSchema = checkSchema(reviewSchema) 

