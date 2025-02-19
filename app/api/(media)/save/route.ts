import { sql } from "@/lib/db";
import { NextResponse } from "next/server"

export const POST=async(req:Request)=>{
    const {user_id, post_id}=await req.json();
    try{
        const like=await sql`
        select * from saved where user_id=${user_id} and post_id=${post_id}

        
        `;
        if(like.length>0){
            await sql`
            DELETE FROM saved 
      WHERE user_id = ${user_id} AND post_id = ${post_id}
            
            `;

        }
        else{
            await sql`
            INSERT INTO saved (user_id, post_id) 
      VALUES (${user_id}, ${post_id})
            
            `;
        }
        return NextResponse.json({
            success: true,
           
          });


    }catch(error){
        
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}