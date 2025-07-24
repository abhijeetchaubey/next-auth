import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


export async function POST(request) {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists",success:false }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password,10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUSer = await newUser.save();
console.log("user details",savedUSer);


    // send verification mail
    const verifiedEmail=await sendEmail({ email, emailType: "VERIFY", userId: savedUSer._id });
    console.log("verifiedEmial",verifiedEmail);
    
    return NextResponse.json({ message: "User created successfully", success:true, status: 201 });
  } catch (error) {
    console.error("API /signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
