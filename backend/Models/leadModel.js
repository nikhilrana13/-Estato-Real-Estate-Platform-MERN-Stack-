import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    sellerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    propertyId:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
    viewerDetail:{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        name:{type:String,required:true},
        email:{type:String,required:true},
        phonenumber:{type:String,required:true},
    }
},{timestamps:true})

const Lead = mongoose.model("Lead",leadSchema)
export default Lead