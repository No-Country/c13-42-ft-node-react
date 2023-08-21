import { Product } from "@prisma/client"
import { prisma } from "~/server/db"

export const getProducts = async()=>{
    const products:Product[] =  await prisma.product.findMany({})
    return products
}

export const getProductsByID = async(id: any)=>{
    const products:Product|null =  await prisma.product.findUnique({
        where:{id : id}
    })
    return products
}