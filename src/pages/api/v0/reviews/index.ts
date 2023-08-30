import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { schemaValidation } from "~/middlewares";
import { createReview, deleteReviewByID, updateReview } from "~/utils/services/reviews";
import { updateWishlist, upsertWishlist } from "~/utils/services/wishlist";
import { createReviewSchema, deleteReviewSchema, updateReviewSchema } from "~/validations/review-validation";
import { updateWhislistSchema, upsertWishlistSchema } from "~/validations/wishlist-validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
          return res.status(404).json({message: "method not availible"});
        case "POST":
          try {
                schemaValidation(createReviewSchema, req, res)
                const review = await createReview(req.body)
                console.log(review);
                
                return res.status(200).json(review)
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
                schemaValidation(updateReviewSchema, req, res)
                const review = await updateReview(req.body)
                console.log(review);
                
                return res.status(200).json(review)
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
                  schemaValidation(deleteReviewSchema, req, res)
  
                  const id: number|any  = req.body.id
                  const review = await deleteReviewByID(id)
                  console.log(review);
                  if (review) {
                      return res.status(200).json(review)
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