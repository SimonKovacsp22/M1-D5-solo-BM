import express from 'express'
import {postProduct,getProducts, getSingleProduct,updateSingleProduct,deleteSingleProduct} from '../../lib/utilities.js'


const productsRouter = express.Router()

productsRouter.post("/",postProduct)

productsRouter.get("/",getProducts)

productsRouter.get("/:id",getSingleProduct)

productsRouter.put("/:id",updateSingleProduct)

productsRouter.delete("/:id",deleteSingleProduct)

export default productsRouter