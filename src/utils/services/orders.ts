import {  Order } from "@prisma/client"
import { prisma } from "~/server/db"
import { createOrderType, updateOrderType } from "~/validations/order-validation"




export const updateOrder = async(body: updateOrderType)=>{
    const order = await prisma.order.update({
        where: {
          id: body.id,
        },
        data: {
            payment_status: body.status
        },
        include: {
            products: {
                select: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true
                        }
                    },
                quantity: true,
                
                }
            },
            user: true,
        }
      })
      return order
}


export const getOrders = async()=>{
    const order = await prisma.order.findMany({
        where:{
            payment_status:'SUCCESS'
        },
        select:{
            user:{
                select:{
                    email: true
                }

            },
            total: true,
            date: true

        }
    })
    return order
}


export const createOrder = async(body: createOrderType)=>{
    console.log(body);
    
    const order:Order =  await prisma.order.create({
        data:{
            id: body.id,
            total: body.total,
            products:{
                create: body.products.map((product: any) => {
                        return {
                          product: { connect: { id: product.id } },
                          quantity: product.quantity,
                        };
                    })
                
                
            },
            user: {
                connect: {
                    id: body.userId
                }
            },
            

        }
    })
    return order
}