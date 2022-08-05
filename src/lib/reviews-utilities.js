import ReviewsModel from "../apis/reviews/model.js"
import ProductsModel from "../apis/products/model.js"
import createHttpError from "http-errors"






export const postReviewForProduct = async (req,res,next) => {

    try{

        const review = new ReviewsModel(req.body)

        const {_id} = await  review.save()

        const product = await ProductsModel.findByIdAndUpdate(req.params.product_id, { $push: { reviews: _id}}, { new: true, runValidators: true} )

        if(!product) return next(createHttpError(404,`product with id: ${req.params.product_id} not foud`))

        res.status(201).send(product)
        
    }catch(error){

        next(error)
    }
}

export const getReviewsForProduct = async (req,res,next) => {

    try{

        const product = await ProductsModel.findById(req.params.product_id).populate("reviews")

        if(!product) return next(createHttpError(404,`product with id: ${req.params.product_id} not foud`))

        const reviews = product.reviews

        res.send(product.reviews)

    }catch(error){

        next(error)
    }
}


export const getSingleReview = async (req,res,next) => {

    try{

        const review = await ReviewsModel.findById(req.params.id)

        if(!review) return next(createHttpError(404,`review with id: ${req.params.id} not foud`))

        res.send(review)

    }catch(error){

        next(error)
    }
}


export const updateReview = async (req,res,next) => {

    try{

        const updatedReview = await ReviewsModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})

        if(!updateReview) return next(createHttpError(404,`review with id: ${req.params.id} not foud`))

        res.send(updatedReview)

    }catch(error){

        next(error)
    }
}

export const deleteReview = async (req,res,next) => {

    try{

        const updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.product_id, 
            { $pull:{ reviews:{ _id: req.params.id } } }, 
            { new:true, runValidators: true})

        if(!updatedProduct) return next(createHttpError(404,`product with id: ${req.params.product_id} not foud`))

        const deletedReview = await ReviewsModel.findByIdAndDelete(req.params.id)

        if(!deletedReview)  return next(createHttpError(404,`review with id: ${req.params.id} not foud`))

        res.status(204).send() 
       

    }catch(error){

        next(error)
    }
}


