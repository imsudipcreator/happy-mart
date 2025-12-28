import { CartService } from "@/server/services/cart.service";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const cartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export async function POST(req: NextRequest) {
  let body;
  const token = req.cookies.get("token")?.value;

  try {
    body = cartSchema.parse(await req.json());
  } catch (err) {
    console.error("Invalid Input: ", err);
    return NextResponse.json({
      success: false,
      code: 400,
      error: "INVALID_INPUT",
      message: "Invalid input",
    });
  }

  if (!token) {
    return NextResponse.json({
      success: false,
      code: 400,
      error: "UNAUTHORIZED",
      message: "Unauthorized request",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    return NextResponse.json({
      success: false,
      code: 400,
      error: "UNAUTHORIZED",
      message: "Unauthorized request",
    });
  }

  const { userId } = decoded as { userId: string };
  const res = await CartService.addItem({ userId, ...body });

  if (!res.success) {
    return NextResponse.json({
      success: false,
      code: 400,
      error: "DB_ERROR",
      message: res.message,
    });
  }

  return NextResponse.json({ success: true, code: 200, data: res.data });
}
