import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async () => {
  try {
    // Await the cookies() promise
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized: No token" }), {
        status: 401,
      });
    }

    // Verify the token
    const SECRET_KEY = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY!);

    return new Response(JSON.stringify({ message: "Verified", user: decoded }), {
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid Token" }), {
      status: 403,
    });
  }
};
