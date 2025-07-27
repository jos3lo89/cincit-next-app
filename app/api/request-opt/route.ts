import { sendOtpCode } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Get the email from the request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // 2. Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // We send a generic success message even if the user is not found
      // to prevent attackers from guessing which emails are registered.
      console.log(`OTP request for non-existent user: ${email}`);
      return NextResponse.json({
        message: "If an account with this email exists, an OTP has been sent.",
      });
    }

    // 3. Generate a 4-digit OTP and its expiration date (10 minutes from now)
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 4. Save or update the OTP in the database using `upsert`
    // This will create a new OTP record if one doesn't exist for the user,
    // or update the existing one with the new code and expiration.
    // await prisma.otp.upsert({
    //   where: {
    //     // Assumes your OTP schema has a unique constraint on userId
    //     userId: user.id,
    //   },
    //   update: {
    //     otpCode: otpCode,
    //     expiresAt: expiresAt,
    //     isUsed: false,
    //   },
    //   create: {
    //     userId: user.id,
    //     otpCode: otpCode,
    //     expiresAt: expiresAt,
    //   },
    // });

    // 5. Send the OTP code via email
    await sendOtpCode(email, otpCode);

    // 6. Return a success message
    // Note: We use the same generic message as the "user not found" case for security.
    return NextResponse.json({
      message: "If an account with this email exists, an OTP has been sent.",
    });
  } catch (error) {
    // 7. Handle errors
    console.error("Error in /api/request-otp:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
