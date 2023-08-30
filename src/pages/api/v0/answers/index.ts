import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { createAnswer, deleteAnswerByID, updateAnswer } from "~/utils/services/product-chat";
import { createAnswerSchema, deleteAnswerSchema, updateAnswerSchema } from "~/validations/product-chat-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
          return res.status(404).json({message: "method not availible"});

            case "POST":
            try {
                schemaValidation(createAnswerSchema, req, res)
                const answer = await createAnswer(req.body)
                console.log(answer);
                
                return res.status(200).json(answer)
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
                schemaValidation(updateAnswerSchema, req, res)
                const answer = await updateAnswer(req.body)
                console.log(answer);
                
                return res.status(200).json(answer)
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
                  schemaValidation(deleteAnswerSchema, req, res)
  
                  const id: number|any  = req.body.id
                  const answer = await deleteAnswerByID(id)
                  console.log(answer);
                  if (answer) {
                      return res.status(200).json(answer)
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