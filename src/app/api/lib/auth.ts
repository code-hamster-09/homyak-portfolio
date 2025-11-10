import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY || "YOUR_SECRET_KEY";

interface DecodedToken {
  id: string;
  // Добавьте другие поля, если они есть в токене
}

export const authenticateToken = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return NextResponse.json(
      { message: "Authentication token required" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;

    (req as any).user = decoded;
    return true;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid or expired token", error: error.message },
      { status: 403 }
    );
  }
};
