import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { updateWishlist, upsertWishlist } from "~/utils/services/wishlist";
import { updateWhislistSchema, upsertWishlistSchema } from "~/validations/wishlist-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
          return res.status(404).json({message: "method not availible"});

            
            case "POST":
            try {
                schemaValidation(upsertWishlistSchema, req, res)
                const wishlist = await upsertWishlist(req.body)
                console.log(wishlist);
                
                return res.status(200).json(wishlist)
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
                schemaValidation(updateWhislistSchema, req, res)
                const wishlist = await updateWishlist(req.body)
                console.log(wishlist);
                
                return res.status(200).json(wishlist)
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