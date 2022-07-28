import express from "express"
import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { extname } from "path"
import { pipeline } from "stream"
import json2csv from "json2csv"
import { getPDFReadableStream } from "../../lib/pdf-utilities.js"
import {  readProducts, saveFileToProductImages, writeProducts,getProductsReadableStream } from "../../lib/utilities.js"

const cloudinaryUploader = multer({storage: new CloudinaryStorage({
  cloudinary,
  params: {
    folder:"july22products"
  }
}),limits: { fileSize: 1024 * 1024}}).single("product_img")


const filesRouter = express.Router()

filesRouter.post("/imageUrl/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("product_img"), async (req, res, next) => {
    
    try {

     const products = await readProducts()

     const productToUpdateIndex = products.findIndex( product => product.product_id === req.params.id)

     const fileName = req.params.id + extname(req.file.originalname)

     if(productToUpdateIndex !== -1){

     const productToUpdate = products[productToUpdateIndex]

     const updatedProduct = {...productToUpdate, imageUrl: `${process.env.WEB_ORIGIN}images/products/${fileName}` }
      
      products[productToUpdateIndex] = updatedProduct

      await writeProducts(products)
     }

      await saveFileToProductImages(fileName, req.file.buffer)

      res.send("UPLOADED")

    } catch (error) {
      next(error)
    }
  })

  filesRouter.get("/:id/PDF", async (req, res, next) => {
    try {

      const products = await readProducts()

      const productToPdf = products.find(product => product.product_id === req.params.id)

      res.setHeader("Content-Disposition", `attachment; filename=${req.params.id}.pdf` )

      const source = getPDFReadableStream(productToPdf)
      const destination = res

      pipeline(source, destination, err => {
        if(err)
        console.log(err)
      } )
      
    } catch (error) {
      next(error)
    }
  })

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

  filesRouter.get("/CSV",async (req,res,next) => {
    try {
      const products = await readProducts()

      res.setHeader("Content-Disposition", `attachment; filename=products.csv` )

      const source = getProductsReadableStream()
      const destination = res
      
      const transform = new json2csv.Transform({fields:["name","brand","price"]})

      pipeline(source,transform, destination, err => {
        if(err)
        console.log(err)
      } )
      
    } catch (error) {
      next(error)
    }
  })

export default filesRouter