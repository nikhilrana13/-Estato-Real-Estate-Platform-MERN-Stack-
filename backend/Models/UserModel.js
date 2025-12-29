import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type:String,default:''},
    email:{type:String,required:true,unique:true},
    emailOtp:{type:String,default:''},
    emailOtpExpiry:{type:Date},
    mywishlists:[{type:mongoose.Schema.Types.ObjectId,ref:'Property'}],
    mylistings:[{type:mongoose.Schema.Types.ObjectId,ref:'Property'}],
    phonesuffix:{type:String,default:''},
    phoneNumber:{type:String,default:''},
    profilepic:{type:String,default:''},
    userplan:{type:String,default:'free',enum:['free','premium']}, // free , premium
},{timestamps:true}) 

export const UserModel = mongoose.model('User',UserSchema);
export default UserModel; 
