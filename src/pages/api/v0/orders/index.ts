import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { createOrder } from "~/utils/services/orders";
import { createOrderSchema } from "~/validations/order-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                
            } catch (error) {
                return res.status(500).json({error})
            }
            case "POST":
            try {
                console.log('order');
                schemaValidation(createOrderSchema, req, res)
                const order = await createOrder(req.body)
                console.log(order);
                
                return res.status(200).json(order)
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
                return res.status(500).json({error})
                
            }
            
    }
  }