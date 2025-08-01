import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"Logout Succesful",
            success:true,
        })

        response.cookies.set("token","",{
            httpOnly:true,expires:new Date(0)
        })

        return response;
    } catch (error: unknown) {
        return NextResponse.json({error: (error instanceof Error ? error.message : "Unknown error")},
            {status:500}
        )
    }
}