import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { deleteProductsByID, getProducts, getProductsByID, updateProduct } from "~/utils/services/products";
import { deleteProductSchema, findProductSchema, updateProductSchema } from "~/validations";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                schemaValidation(findProductSchema, req, res)

                const { id } = req.query
                const product = await getProductsByID(id)
                console.log(product);
                if (product) {
                    return res.status(200).json(product)
                } else {
                    throw {message: 'No item with request Id'}
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

        case "PATCH":
              try {
                  schemaValidation(updateProductSchema, req, res)
  
                  const { id } = req.query
                  const {data} = req.body
                  const product = await updateProduct(id, data)
                  console.log(product);
                  if (product) {
                      return res.status(200).json(product)
                  } else {
                      throw {message: 'Update Failed'}
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
            return 
            break;
            case "DELETE":
              try {
                  schemaValidation(deleteProductSchema, req, res)
  
                  const { id } = req.query
                  const product = await deleteProductsByID(id)
                  console.log(product);
                  if (product) {
                      return res.status(200).json(product)
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
            return 
            break;
        
    
        default:
            try {
                const products = getProducts()
                console.log(products);
                
                return res.status(200).json(products)
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