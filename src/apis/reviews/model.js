import mongoose from "mongoose";

const {model,Schema} = mongoose

const reviewSchema = new Schema ({
    comment:{type:String, required: true},
    rate:   {type:Number, required: true},
})

export default model("Review", reviewSchema)