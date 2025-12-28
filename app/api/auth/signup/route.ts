import { registerUser } from "@/server/services/auth.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  let user;

  try {
    user = signUpSchema.parse(await req.json());
  } catch (err) {
    console.error("Invalid Input: ", err);
    return NextResponse.json(
      {
        success: false,
        code: 400,
        message: "Invalid input",
      },
      { status: 400 }
    );
  }

  const registerResponse = await registerUser(user);

  if (!registerResponse.success) {
    console.error("Something went wrong while registering the user.");
    const res = NextResponse.json({
      success: false,
      code: 400,
      message: registerResponse.message,
      user: null,
    });

    return res;
  }

  const { token, email, id, name } = registerResponse.data;

  const res = NextResponse.json({
    success: true,
    code: 200,
    user: {
      id,
      name,
      email,
    },
  });

  // set cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return res;
}
