import { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "~/utils/services/products";

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
            return 
            break;
        
    
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