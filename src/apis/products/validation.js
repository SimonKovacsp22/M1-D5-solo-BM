import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is a mandatory field and needs to be a string!",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is a mandatory field and needs to be a string!",
    },
  },
  description:{
    in: ["body"],

    isString: {
      errorMessage: "Description is a mandarory field and must be a string!",
    },
  
  
},
brand:{
    in: ["body"],

    isString: {
      errorMessage: "Brand is a mandarory field and must be a string!",
    },
  
  
},
price:{
    in: ["body"],

    isNumber: {
      errorMessage: "Price is a mandarory field and must be a numbe4r!",
    },
  
  
},


}


export const checkProductSchema = checkSchema(productSchema) 

export const checkValidationResult = (req, res, next) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    
    next(createHttpError(400, "Validation errors in request body!", { errorsList: errors.array() }))
  } else {
    
    next()
  }
}