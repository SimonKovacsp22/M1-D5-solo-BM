import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"
import uniqid from 'uniqid'


export const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)),"../data")

 const productsJSONPath =  join(dataFolderPath,"products.json")

export const publicFolderPath =join(process.cwd(),"./public")

const productImagesFolderPath = join(publicFolderPath,"./images/products")





export const postProduct = async (req,res,next) => {
   try{
    const products = await readProducts()
    
    const newProduct = {...req.body, product_id: uniqid(), createdAt: new Date(), updatedAt: new Date()}

    products.push(newProduct)

    await writeProducts(products)

    res.status(201).send({id: newProduct.product_id})


} catch(error){
    next(error)
}
}

export const getProducts = async (req,res,next) => {
    try{

        const products = await readProducts()

        if(req.query && req.query.category){

            const filteredProductsByCategory = products.filter(product => product.category === req.query.category)

            res.send(filteredProductsByCategory)

        }else{
            res.send(products)
    }

        

    } catch(error) {
        next(error)
    }
}

export const getSingleProduct = async (req,res,next) => {
    try{

        const products = await readProducts()

        const requestedProduct = products.find(product => product.product_id === req.params.id)

        res.send(requestedProduct)

    }catch(error){
        next(error)
    }
}

export const updateSingleProduct = async (req,res,next) => {
    try{

        const products = await readProducts()

        const productToUpdateIndex = products.findIndex(product => product.product_id === req.params.id)

        const productToUpdate = products[productToUpdateIndex]

        const updatedProduct = {...productToUpdate, ...req.body, updatedAt: new Date()}

        products[productToUpdateIndex] = updatedProduct

        await writeProducts(products)

        res.send(updatedProduct)

    }catch(error){
        next(error)
    }
}


export const deleteSingleProduct = async (req,res,next) => {
    try{

        const products = await readProducts()

        const remainingProducts = products.filter (product => product.product_id !== req.params.id)

        await writeProducts(remainingProducts)

        res.status(204).send("product with id:"+ req.params.id +"was deleted")

    }catch(error){
        next(error)
    }
}





export const writeProducts = productsArray => fs.writeJSON(productsJSONPath,productsArray)

export const readProducts = () => fs.readJSON(productsJSONPath)

export const saveFileToProductImages = (fileName, contentAsBuffer) => fs.writeFile(join(productImagesFolderPath, fileName), contentAsBuffer)