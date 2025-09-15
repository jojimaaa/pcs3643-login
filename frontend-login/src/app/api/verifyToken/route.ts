import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
    const {token} = await req.json();
  if (!token) {
    return NextResponse.json({ valid: false, error: "No token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    return NextResponse.json({ valid: true, decoded });
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err.message }, { status: 401 });
  }
}
