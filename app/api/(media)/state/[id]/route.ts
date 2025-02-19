import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST=async(req:Request)=>{
    const {user_id, post_id}=await req.json();

    try{
        const isThere=await sql`
        select * from likes where user_id=${user_id} and post_id=${post_id}
        `;
        if(isThere.length>0){
            return NextResponse.json({heart: true})

        }
        return NextResponse.json({heart: false})

    }catch(error){

        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
export const GET=async({id}: {id:any})=>{


    
    console.log("my user is", id);
    try{
        const people=await sql`
        select * from users where user_id!=${id}
        `;
        return NextResponse.json({people});

    }catch(error){
        return NextResponse.json({error});
    }
}