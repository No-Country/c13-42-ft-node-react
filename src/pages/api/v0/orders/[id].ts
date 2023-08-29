import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { deleteProductsByID, getProducts, getProductsByID, updateProduct } from "~/utils/services/products";
import { deleteProductSchema, findProductSchema, updateProductSchema } from "~/validations";
import { updateOrderSchema } from "~/validations/order-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                
                
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
                  schemaValidation(updateOrderSchema, req, res)
  
                  
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
            try {
              
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json(
                      error.issues.map((issue) => ({
                        message: issue.message
                      }))
                    );
                  }
                  return res.status(400).json({ message: "BAD_REQUEST" });
                
            }
            
    }
  }