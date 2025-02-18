import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Fetch user from database
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    // If user does not exist
    if (user.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user[0].email, id: user[0].id, username: user[0].username, fullName: user[0].fullName }, // Payload
      process.env.JWT_SECRET as string, // Secret key (store in .env)
      { expiresIn: "7d" } // Token expiration
    );

    // Set cookie in response
    return new Response(JSON.stringify({ message: "Login successful", user: user[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `auth-token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
