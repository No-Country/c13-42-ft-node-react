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
            products: true,
        }
      })
      return order
}


export const createOrder = async(body: createOrderType)=>{
    console.log(body);
    
    const order:Order =  await prisma.order.create({
        data:{
            id: body.id,
            products: {
                connect: body.products
                
            },
            user: {
                connect: {
                    id: body.userId
                }
            },
            total: body.total,

        }
    })
    return order
}