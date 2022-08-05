import express from 'express'
import {postProduct,getProducts,getProductById,updateProduct,deleteProduct} from '../../lib/utilities.js'


const productsRouter = express.Router()

productsRouter.post("/",postProduct)

productsRouter.get("/",getProducts)

productsRouter.get("/:id",getProductById)

productsRouter.put("/:id",updateProduct)

productsRouter.delete("/:id",deleteProduct)

export default productsRouter