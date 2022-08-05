import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";
import reviewsRouter from "./apis/reviews/index.js";
import filesRouter from "./apis/files/index.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import cors from "cors";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericServerErrorHandler,
} from "./apis/errorHandlers.js";

const port = process.env.PORT;
const server = express();

const whitelist = ['http://localhost:3000', process.env.FE_ORIGIN, process.env.FE_ORIGIN_ENCODED]

server.use(
  cors({
    origin: (origin, corsNext) => {
      console.log("ORIGIN:", origin);

      if (!origin || whitelist.indexOf(origin) !== -1) {
        corsNext(null, true);
      } else {
        corsNext(
          createHttpError(
            400,
            "Cors Error! Your origin " + origin + "is not in the list"
          )
        );
      }
    },
  })
);



server.use(express.json());

server.use("/products", productsRouter);
server.use("/products", reviewsRouter);
server.use("/files", filesRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericServerErrorHandler);

mongoose.connect(process.env.MONGO_CON_URL)

mongoose.connection.on("connected",()=>{
  console.log("success")

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
})
})
