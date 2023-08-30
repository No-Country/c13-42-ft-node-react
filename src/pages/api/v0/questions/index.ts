import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { createQuestion, deleteQuestionByID, updateQuestion } from "~/utils/services/product-chat";
import { updateWishlist, upsertWishlist } from "~/utils/services/wishlist";
import { createQuestionSchema, deleteQuestionSchema, updateQuestionSchema } from "~/validations/product-chat-validation";
import { updateWhislistSchema, upsertWishlistSchema } from "~/validations/wishlist-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
          return res.status(404).json({message: "method not availible"});

            case "POST":
            try {
                schemaValidation(createQuestionSchema, req, res)
                const question = await createQuestion(req.body)
                console.log(question);
                
                return res.status(200).json(question)
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json(
                      error.issues.map((issue) => ({
                        message: issue.message
                      }))
                    );
                  }
                  return res.status(400).json(error);
            }
            case "PATCH":
            try {
                schemaValidation(updateQuestionSchema, req, res)
                const question = await updateQuestion(req.body)
                console.log(question);
                
                return res.status(200).json(question)
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json(
                      error.issues.map((issue) => ({
                        message: issue.message
                      }))
                    );
                  }
                  return res.status(400).json(error);
            }
            case "DELETE":
              try {
                  schemaValidation(deleteQuestionSchema, req, res)
  
                  const id: number|any  = req.body.id
                  const question = await deleteQuestionByID(id)
                  console.log(question);
                  if (question) {
                      return res.status(200).json(question)
                  } else {
                      throw {message: 'Delete Failed'}
                  }
                  
              } catch (error) {
                  if (error instanceof ZodError) {
                      return res.status(400).json(
                        error.issues.map((issue) => ({
                          message: issue.message
                        }))
                      );
                    }
                    return res.status(400).json(error);
                  
              }
        default:
            return res.status(404).json({message: "method not availible"});
            
    }
  }