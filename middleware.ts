import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "experimental-edge";

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  console.log("🔐 Middleware - userId:", userId);
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|sign-in|sign-up|api|logo-GiugnoDistribuciones.jpeg).*)",
  ],
};







