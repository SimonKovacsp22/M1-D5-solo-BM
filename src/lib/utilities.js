import { sendEmail } from "./email-tools.js"
import ProductsModel from "../apis/products/model.js"
import createHttpError from "http-errors"








export const postProduct = async (req,res,next) => {

   try{

    const newProduct = new ProductsModel(req.body)

    const {_id} = await newProduct.save()
    
    res.status(201).send({ id: _id})

} catch(error){
    next(error)
}
}

export const getProducts = async (req,res,next) => {
    try{
       
        const products = await ProductsModel.find()

        res.send(products)
       
    } catch(error) {
        
        next(error)
    }
}

export const getProductById = async (req,res,next) => {

    try{

        const product = await ProductsModel.findById(req.params.id)

        if(!product) next(createHttpError(404,`product with id: ${req.params.id} not found`))

        res.send(product)

    }catch(error){

        next(error)
    }
}

export const updateProduct = async (req,res,next) => {

    try{

        const updatedProduct = await ProductsModel.findByIdAndUpdate( req.params.id, req.body, {new:true, runValidators:true})

        if(!updatedProduct) next(createHttpError(404,`product with id: ${req.params.id} not found`))

       res.send(updatedProduct)

    }catch(error){
        next(error)
    }
}


export const deleteProduct = async (req,res,next) => {

    try{

        const deletedProdut = await ProductsModel.findByIdAndDelete(req.params.id)

        if(!deleteProduct) next(createHttpError(404,`product with id: ${req.params.id} not found`))
        
        res.status(204).send()

    }catch(error){
        next(error)
    }
}





