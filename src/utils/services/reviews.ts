import {  Review } from "@prisma/client"
import { prisma } from "~/server/db"
import { createReviewType, updateReviewType } from "~/validations/review-validation"




export const updateReview = async(body: updateReviewType)=>{
    const review = await prisma.review.update({
        where: {
          id: body.id,
        },
        data: body.data
        
      })
      return review
}

export const createReview = async(body: createReviewType)=>{
    const review:Review =  await prisma.review.create({
        data: {
            userId: body.userId,
            productId: body.productId,
            content: body.content,
            score: body.score,
            title: body.title
        },
        include: {
            user: {
                select:{
                    email: true,
                    id: true,
                    image: true
                }
            }
        }

    })
    return review
}

export const deleteReviewByID = async(id: number)=>{
    const review:Review|null =  await prisma.review.delete({
        where:{id : id}
    })
    return review
}