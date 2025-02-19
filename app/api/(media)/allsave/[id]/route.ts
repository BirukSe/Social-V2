import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET=async(request: Request, {params}: {params: any})=>{
    const {id}=await params;
    try{
        const saved=await sql`
        SELECT posts.* 
            FROM saved 
            INNER JOIN posts ON saved.post_id = posts.id
            WHERE saved.user_id = ${id}
        
        `;
        return NextResponse.json(saved);

    }catch(error){
        return NextResponse.json({error})
    }
}