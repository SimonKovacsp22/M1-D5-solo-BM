import mongoose from "mongoose";

const { Schema,model } = mongoose

const productSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    brand:{type:String,required:true},
    imageUrl:{type:String},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    reviews:[{type:mongoose.Types.ObjectId,ref:"Review"}]
},
{timestamps: true},
)

export default model("Product",productSchema)