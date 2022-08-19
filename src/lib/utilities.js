import ProductsModel from "../apis/products/model.js"
import createHttpError from "http-errors"
import q2m from "query-to-mongo"








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

        const mongoQuery = q2m(req.query)

        console.log(mongoQuery)

        const total = await ProductsModel.countDocuments(mongoQuery.criteria)

        const products = await ProductsModel.find(mongoQuery.criteria, mongoQuery.options.fields).limit(mongoQuery.options.limit)
        .skip(mongoQuery.criteria.skip).sort(mongoQuery.options.sort).populate("reviews")

        const totalPages = Math.ceil(total / mongoQuery.options.limit)

        const limit = mongoQuery.options.limit

        res.send({total, totalPages, limit, products})
       
    } catch(error) {
        
        next(error)
    }
}

export const getProductById = async (req,res,next) => {

    try{

        const product = await ProductsModel.findById(req.params.id).populate("reviews")

        if(!product) return next(createHttpError(404,`product with id: ${req.params.id} not found`))

        res.send(product)

    }catch(error){

        next(error)
    }
}

export const updateProduct = async (req,res,next) => {

    try{

        const updatedProduct = await ProductsModel.findByIdAndUpdate( req.params.id, req.body, {new:true, runValidators:true})

        if(!updatedProduct) return next(createHttpError(404,`product with id: ${req.params.id} not found`))

       res.send(updatedProduct)

    }catch(error){
        next(error)
    }
}


export const deleteProduct = async (req,res,next) => {

    try{

        const deletedProdut = await ProductsModel.findByIdAndDelete(req.params.id)

        if(!deleteProduct) return next(createHttpError(404,`product with id: ${req.params.id} not found`))
        
        res.status(204).send()

    }catch(error){
        next(error)
    }
}





