import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  const { fullName, username, email, password } = await request.json();
  console.log("mydat", fullName, username, email, password);
  
  try {
    // Check if email already exists
    const user1 = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (user1.length !== 0) {
      return new Response(
        JSON.stringify({ error: "Email already taken" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await sql`
      INSERT INTO users (full_name, username, email, password)
      VALUES (${fullName}, ${username}, ${email}, ${hashedPassword})
    `;

    // Fetch the newly inserted user to get their id
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    
    if (user.length === 0) {
      return new Response(
        JSON.stringify({ error: "User creation failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user[0].email, id: user[0].id, fullName: user[0].fullName, username: user[0].username }, // Payload
      process.env.JWT_SECRET as string, // Secret key (store in .env)
      { expiresIn: "7d" } // Token expiration
    );

    // Set the token in the response cookies
    return new Response(
      JSON.stringify({ message: "User created successfully", user: user[0] }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `auth-token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
