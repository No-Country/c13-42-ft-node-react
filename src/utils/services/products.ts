import { Product } from "@prisma/client"
import { prisma } from "~/server/db"
import { CreateProductType, updateProductType } from "~/validations"
import { formatDatesArray } from "../dates"

export const getProducts = async()=>{
    const products:Product[] =  await prisma.product.findMany({})
    return products
}

export const getProductsAmount = async(n: number)=>{
    const products:Product[]|any =  await prisma.product.findMany({
        take: n,
        orderBy:{
            views: 'desc'
        },
        select: {
            id:true,
            views:true,
            name:true, 
        }
    })
    return products
}
export const getProductsAmountMain = async(n: number)=>{
    const products:Product[]|any =  await prisma.product.findMany({
        take: n,
        orderBy:{
            views: 'desc'
        },
        
    })
    return products
}

export const getProductsByID = async(id: string)=>{
    const products:Product|null =  await prisma.product.findUnique({
        where:{id : id},
        include: {
            reviews: {
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            
            questions: {
                
                include:{
                    answer: true,
                    user: true
                }
            }
        }
    })
    return products
}

export const updateViews = async(id: string)=>{
    let product:any|null =  await prisma.product.update({
        where:{id : id},
        data: {
            views:{
                increment: 1
            }
        },
        include: {
            reviews: {
                orderBy:{date: 'desc'},
                include: {
                    user: {
                        select: {
                            email: true,
                            id: true,
                            image: true
                        }
                    }
                }
            },
            
            questions: {
                orderBy:{date: 'desc'},
                include:{
                    answer: {
                        select: {
                            content: true
                        }
                    },
                    user: {
                        select:{
                            email: true,
                            id: true
                        }
                    }
                }
            },
            wishlists:{
                select: {userID: true}
            }
        }
    })
    product.questions = formatDatesArray(product.questions)
    product.reviews = formatDatesArray(product.reviews)
    console.log(product);
    
    return product
}


export const deleteProductsByID = async(id: string)=>{
    const products:Product|null =  await prisma.product.delete({
        where:{id : id}
    })
    return products
}

export const updateProduct = async(id: string, data: updateProductType)=>{
    const products:Product|null =  await prisma.product.update({
        where:{id : id},
        data: data
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