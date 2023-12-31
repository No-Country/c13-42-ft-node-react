import { User } from "@prisma/client";
import { prisma } from "~/server/db";

export const getUser = async(id: string)=>{
    
    const user:User =  await prisma.user.findUniqueOrThrow({
        where:{
            id: id
        },
        include: {
            order: {
                orderBy: {
                    date: 'desc'
                },
                include:{
                    products:{
                        include:{
                            product:true
                        }
                    }
                },
                
            },
            wishlist: {
                select: {
                    id:true,
                    products:true
                },
                
            },
            questions:true,
            reviews:true,
        }
    })
    return user
        
}