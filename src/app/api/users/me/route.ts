import {getDataFromToken} from "@/helpers/getDataFromToken"

import { NextRequest,NextResponse } from "next/server"
import User from "@/models/userModel"
import { connectDB } from "@/db/dbConfig"

connectDB();

export async function GET(request:NextRequest){
    try {
        const userID =await getDataFromToken(request)
            console.log("useerId",userID);
            
        const user =await User.findOne({_id:userID}).select("-password ")
            console.log("user details",user);
            
        return NextResponse.json({message:"user found",
            data:user

        })
    } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({error: errorMessage}, {status:400})
    }
}