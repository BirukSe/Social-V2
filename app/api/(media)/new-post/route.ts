import { sql } from "@/lib/db";
import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
  
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const userId=formData.get("userId") as string;
    const caption = formData.get("caption") as string | null;
    const location = formData.get("location") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const mimeType = file.type; 

   
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const uploadedImage = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`, {
      resource_type: "image", 
    });

    console.log("Uploaded image URL:", uploadedImage.secure_url);
    await sql`
    INSERT INTO posts (user_id, image_url, caption, location) 
    VALUES (${userId}, ${uploadedImage.secure_url}, ${caption}, ${location})
  `;

    return NextResponse.json({
      success: true,
      imageUrl: uploadedImage.secure_url,
      caption,
      location,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
export const GET = async () => {
    try {
        const posts = await sql`
            SELECT 
                posts.*, 
                users.full_name, 
                users.email 
            FROM 
                posts 
            JOIN 
                users 
            ON 
                posts.user_id = users.id;
        `;

        // Return the posts data in the response
        return new Response(JSON.stringify(posts), {
            status: 200, // HTTP status code
            headers: {
                'Content-Type': 'application/json', // Set content type
            }
        });
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};

