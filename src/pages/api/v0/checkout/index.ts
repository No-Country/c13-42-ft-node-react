import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from 'mercadopago'
import { env } from "~/env.mjs";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { baseUrl } from "~/utils/constants";
import { redirect } from "next/dist/server/api-utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mercadopago.configure({
        access_token: env.MP_TOKEN
    });
    
    if (req.method === "POST") {
        const preference: CreatePreferencePayload = {
            items: [
              {
                id:'1234',
                
                title: 'Test',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 10.5
              }
            ],
            auto_return: "approved",
            back_urls:{
                success: `${baseUrl}/success`,
                failure:`${baseUrl}/`
            },
            payer:{
                email: "santisonzini1234@gmail.com",
                name:'santiago',
                
            }

            
          };
          console.log(req.body);
          const result = await mercadopago.preferences.create(preference)          
          console.log(result);
          
          res.status(200).send({url: result.body.init_point, id: result.body.id})
        }else{
            res.status(400).json({message: "method not allowed"})
        }
    

}