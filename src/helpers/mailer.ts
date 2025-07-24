import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface SendEmailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailOptions) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPaswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "4a0134af6dbb2a",
        pass: "ca29fc2b271bf4",
      },
    });

    const mailOPtions = {
        from:'abhijeet@gmail.com',
        to:email,
        subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
        html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to  
        ${emailType === "VERIFY" ? "verify your email" : 
        "reset your password"}</p>`
    }

    const mailresponse = await transporter.sendMail(mailOPtions)

    return mailresponse
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
