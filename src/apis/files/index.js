import express from "express"
import multer from "multer"
import { extname } from "path"
import { pipeline } from "stream/promises"
import { getPDFReadableStream } from "../../lib/pdf-utilities.js"
import { getProducts, readProducts, saveFileToProductImages, writeProducts } from "../../lib/utilities.js"


const filesRouter = express.Router()

filesRouter.post("/imageUrl/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("product_img"), async (req, res, next) => {
    
    try {

     const products = await readProducts()

     const productToUpdateIndex = products.findIndex( product => product.product_id === req.params.id)

     const fileName = req.params.id + extname(req.file.originalname)

     if(productToUpdateIndex !== -1){

     const productToUpdate = products[productToUpdateIndex]

     const updatedProduct = {...productToUpdate, imageUrl: `http://localhost:3002/images/products/${fileName}` }
      
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

export default filesRouter