import { Product } from "@prisma/client"
import { prisma } from "~/server/db"

export const getProducts = async()=>{
    const products:Product[] =  await prisma.product.findMany({})
    return products
}