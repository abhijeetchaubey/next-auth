import { connectDB } from "@/db/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";



connectDB()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token);

        const user =await User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry= undefined;
        await user.save();

        return NextResponse.json({
            message:"Email Verified Successfull",
            success:true
        })
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({error: errorMessage}, {status:500});
    }
}