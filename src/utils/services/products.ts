import { Product } from "@prisma/client"
import { prisma } from "~/server/db"
import { CreateProductType } from "~/validations"

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

export const createProduct = async(body: CreateProductType)=>{
    const products:Product =  await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
            category: body.category,
            brand: body.brand,
            images: body.images,
            gender: body.gender,
            product_type: body.product_type,
            sub_title: body.sub_title
        }
    })
    return products
}