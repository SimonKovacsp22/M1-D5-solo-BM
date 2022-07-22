import {  join } from "path"
import {dataFolderPath} from "./utilities.js"
import fs from "fs-extra"
import uniqid from 'uniqid'



export const reviewsJSONPath =  join(dataFolderPath,"reviews.json")

export const writeReviews = reviewsArray => fs.writeJSON(reviewsJSONPath,reviewsArray)

export const readReviews = () => fs.readJSON(reviewsJSONPath)




export const postReviewForProduct = async (req,res,next) => {
    try{

        const reviews = await readReviews()

        const newReview = {...req.body, productId: req.params.product_id, review_id: uniqid(), createdAt: new Date(), updatedAt: new Date()}

        reviews.push(newReview)

        await writeReviews(reviews)

        res.status(201).send({id: newReview.review_id})

    }catch(error){
        next(error)
    }
}

export const getReviewsForProduct = async (req,res,next) => {
    try{

        const reviews = await readReviews()

        const reviewsForProduct = reviews.filter(review => review.productId === req.params.product_id)
        
        res.send({reviewsForProduct})


    }catch(error){
        next(error)
    }
}


export const getSingleReview = async (req,res,next) => {
    try{

        const reviews = await readReviews()

        const reviewsForProduct = reviews.filter(review => review.productId === req.params.product_id)

        const foundReview = reviewsForProduct.find(review => review.review_id === req.params.id)
        
        res.send({foundReview})


    }catch(error){
        next(error)
    }
}


export const updateReview = async (req,res,next) => {
    try{

        const reviews = await readReviews()

        const reviewToUpdateIndex = reviews.findIndex(review => review.review_id === req.params.id)
        
        const reviewToUpdate = reviews[reviewToUpdateIndex]

        const updatedReview = {...reviewToUpdate,...req.body, updatedAt: new Date()}

        reviews[reviewToUpdateIndex] = updatedReview

        await writeReviews(reviews)

        res.send(updatedReview)


    }catch(error){
        next(error)
    }
}

export const deleteReview = async (req,res,next) => {
    try{

        const reviews = await readReviews()

        const remainingReviews = reviews.filter(review => review.review_id !== req.params.id)

        await writeReviews(remainingReviews)
        
        res.status(204).send("review with id:"+ req.params.id + "was deleted")


    }catch(error){
        next(error)
    }
}


