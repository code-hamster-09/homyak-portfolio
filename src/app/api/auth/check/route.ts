import { authenticateToken } from "../../lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authResult = await authenticateToken(req);
  if (authResult === true) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } else {
    return authResult;
  }
}
