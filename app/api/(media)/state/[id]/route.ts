import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
export const GET=async(request: NextRequest,{params}: {params: any})=>{

let {id}=await params;


    
    console.log("my user is", id);
    try{
        const people=await sql`
        select * from users where id!=${id}
        `;
        console.log('my people are',people)
        return Response.json(people);

    }catch(error){
        return NextResponse.json({error});
    }
}