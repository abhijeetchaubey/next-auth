import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import {  NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB();
export async function POST(request){
    try {
        const reqBody =await  request.json();
        const {email,password} = reqBody;
        console.log("password is ",password);
        
        if(!email || !password){
            return NextResponse.json({message:"email or passowrd is requried"},{status:400})
        }

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        console.log("user db",user);
        
        console.log("username",user.username);
        console.log("password",user.password);
        
        
        // check password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        console.log("validPAssword",validPassword);
        
        if(!validPassword){
            return NextResponse.json({message:"Invalid User Password. Please enter correct password"})
        }
        // create Token data
        const tokenData = {
            id:user._id,
            username :user.username,
            email:user.email
        }
        // create token 
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Login Succesfully",
            success :true
        })

        response.cookies.set("token",token,{
            httpOnly:true

        })
        return response
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500
        })
    }
}