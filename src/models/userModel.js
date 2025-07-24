import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requried:[true,"Please Provide a username"],
        unique:true,
    },
    email:{
        type:String,
        requried:[true,"Please Provide a email"],
        unique:true,
    },
    password:{
        type:String,
        requried:[true,"Please Provide a password"],
    },
    isVerified:{
        type: Boolean,
        default :false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPaswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;