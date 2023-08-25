import {  Wishlist } from "@prisma/client"
import { prisma } from "~/server/db"
import { updateWishlistType, upsertWishlistType } from "~/validations/wishlist-validation"



// export const getWishlistUser = async(id: string)=>{
//     const wishlist:Wishlist =  await prisma.wishlist.findUniqueOrThrow({
//         where: {
//             userID: id
//         }
//     })
//     return wishlist
// }

export const updateWishlist = async(body: updateWishlistType)=>{
    const wishlist = await prisma.wishlist.update({
        where: {
          userID: body.userId,
        },
        data: {
          products: {
            disconnect: body.products,
          },
        },
        include: {
          products: true,
        },
      })
      return wishlist
}

export const upsertWishlist = async(body: upsertWishlistType)=>{
    const wishlist:Wishlist =  await prisma.wishlist.upsert({
        where: {
            userID: body.userId
        },
        update:{
            products: {
                connect: {
                    id: body.productId
                }
            } 
        },
        create:{
            user: {
                connect:{
                    id:body.userId
                }
            },
            products:{
                connect: {
                    id: body.productId
                }
            }
            
        },
        include: {
            products: true,
            user: true
        }
    })
    return wishlist
}