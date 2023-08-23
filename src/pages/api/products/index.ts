import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { createProduct, getProducts } from "~/utils/services/products";
import { CreateProductSchema } from "~/validations";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                console.log('hola');
                const products = await getProducts()
                console.log(products);
                
                return res.status(200).json(products)
            } catch (error) {
                return res.status(500).json({error})
                
            }
            case "POST":
            try {
                console.log('hola');
                schemaValidation(CreateProductSchema, req, res)
                const products = await createProduct(req.body)
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
                  return res.status(400).json(error);
            }
        default:
            try {
                const products = getProducts()
                console.log(products);
                
                return res.status(200).json(products)
            } catch (error) {
                return res.status(500).json({error})
                
            }
            
    }
  }