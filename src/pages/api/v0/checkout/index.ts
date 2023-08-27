import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from 'mercadopago'
import { env } from "~/env.mjs";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { baseUrl } from "~/utils/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mercadopago.configure({
        access_token: env.MP_TOKEN
    });
    
    if (req.method === "GET") {
        const preference: CreatePreferencePayload = {
            items: [
              {
                title: 'Test',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 10.5
              }
            ],
            auto_return: "approved",
            back_urls:{
                success: `${baseUrl}/`,
                failure:`${baseUrl}/`
            },
            payer:{
                email: "santisonzini1234@gmail.com",
                name:'santiago',
                
            }

            
          };
          
          const result = await mercadopago.preferences.create(preference)
          console.log(result);
          res.status(200).send({url: result.body.init})
        }else{
            res.status(400).json({message: "method not allowed"})
        }
    

}