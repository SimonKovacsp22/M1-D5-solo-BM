import express from "express"
import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import ProductsModel from "../products/model.js"
import createHttpError from "http-errors"



const cloudinaryUploader = multer({storage: new CloudinaryStorage({
  cloudinary,
  params: {
    folder:"july22products"
  }
}),limits: { fileSize: 1024 * 1024}}).single("product_img")


const filesRouter = express.Router()





  filesRouter.post("/cloudinary/:id",cloudinaryUploader,async (req,res,next)=>{

    try {
      
        const product = await ProductsModel.findByIdAndUpdate(req.params.id,{ imageUrl :req.file.path }, {new: true, runValidators:true} )

        if(!product) return next(createHttpError(404,`Product with id: ${req.params.id} not found`))

        res.send(product)
       
      } catch (error) {
      next(error)
      
    }
  })

 
export default filesRouter