import {  ProductAnswers, ProductQuestions } from "@prisma/client"
import { prisma } from "~/server/db"
import { createAnswerType, createQuestionType, updateAnswerType, updateQuestionType } from "~/validations/product-chat-validation"




export const updateQuestion= async(body: updateQuestionType)=>{
    const question = await prisma.productQuestions.update({
        where: {
          id: body.id,
        },
        data: body.data
        
      })
      return question
}

export const updateAnswer= async(body: updateAnswerType)=>{
    const question = await prisma.productAnswers.update({
        where: {
          id: body.id,
        },
        data: body.data
        
      })
      return question
}

export const createQuestion = async(body: createQuestionType)=>{
    const question:ProductQuestions =  await prisma.productQuestions.create({
        data: {
            userId: body.userId,
            productId: body.productId,
            content: body.content,
        },
        include: {
            user:{
                select:{
                    email:true,
                    id: true
                }
            }
        }

    })
    return question
}


export const createAnswer = async(body: createAnswerType)=>{
    const question:ProductAnswers =  await prisma.productAnswers.create({
        data: {
            userId: body.userId,
            questionId: body.questionId,
            content: body.content,
        }

    })
    return question
}

export const deleteQuestionByID = async(id: number)=>{
    const question:ProductQuestions|null =  await prisma.productQuestions.delete({
        where:{id : id}
    })
    return question
}

export const deleteAnswerByID = async(id: number)=>{
    const answer:ProductAnswers|null =  await prisma.productAnswers.delete({
        where:{id : id}
    })
    return answer
}