import { NextApiRequest, NextApiResponse } from "next";
import { getProducts, getProductsByID } from "~/utils/services/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                const { id } = req.query
                if(id)
                {
                    console.log('hola');
                    const products = await getProductsByID(id)
                    console.log(products);
                    return res.status(200).json(id)
                }
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