import express from "express";
import listEndpoints from 'express-list-endpoints';
import productsRouter from './apis/products/index.js'
import reviewsRouter from "./apis/reviews/index.js";
import filesRouter from "./apis/files/index.js";
import cors from 'cors';
import { publicFolderPath } from "./lib/utilities.js";
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericServerErrorHandler} from "./apis/errorHandlers.js";


const server = express()
const port = 3002

server.use(express.static(publicFolderPath))

server.use(cors())
server.use(express.json())

server.use("/products",productsRouter)
server.use("/products",reviewsRouter)
server.use("/files",filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)

server.listen(port,() => {
    console.table(listEndpoints(server))
    console.log("Server is running on port:", port)
})
