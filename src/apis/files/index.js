import express from "express"
import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { extname } from "path"
import { pipeline } from "stream"
import json2csv from "json2csv"



const cloudinaryUploader = multer({storage: new CloudinaryStorage({
  cloudinary,
  params: {
    folder:"july22products"
  }
}),limits: { fileSize: 1024 * 1024}}).single("product_img")


const filesRouter = express.Router()





  filesRouter.post("/cloudinary/:id",cloudinaryUploader,async (req,res,next)=>{
    try {
      const products = await readProducts()
      const productToUpdateIndex =products.findIndex(product => product.product_id === req.params.id)

      if(productToUpdateIndex !== -1) {
        console.log(req.file)

        const fileName = req.params.id + extname(req.file.originalname)
        products[productToUpdateIndex] = {...products[productToUpdateIndex], imageUrl: req.file.path }

        await writeProducts(products)


      }

      
      res.send()

      
    } catch (error) {
      next(error)
      
    }
  })

 
export default filesRouter