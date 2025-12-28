import { loginUser } from "@/server/services/auth.service";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  let user;

  try {
    user = signInSchema.parse(await req.json());
  } catch (error) {
    console.error("Validation error: ", error);
    return NextResponse.json({
      success: false,
      message: "Invalid input",
      code: 500,
    });
  }

  const loginResponse = await loginUser(user);

  if (!loginResponse.success) {
    return NextResponse.json({
      success: false,
      code: 500,
      message: loginResponse.message,
    });
  }

  const { id, email, name, token } = loginResponse.data;

  const res = NextResponse.json({
    success: true,
    code: 200,
    user: {
      id,
      name,
      email,
    },
  });

  // set token to cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return res;
}
