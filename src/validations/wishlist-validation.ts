import { z } from "zod";



export const updateWhislistSchema = z.object({
  
  body: z.object({
    products: z.array(z.object({
      id: z.string({required_error: "product id list is requiered, [{id: 'id'}, ...] "})
    },{required_error: "product id list is requiered [{id: 'id'}]"})),
    userId: z
    .string(
      {required_error: "userId is required"}
    )

  })
})



export const upsertWishlistSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: "userId is required"
      })
      .min(3)
      .trim(),
    productId: z
      .string({
        required_error: "productId is required"
      })
      .min(1),

})
})



export type upsertWishlistType = z.infer<typeof upsertWishlistSchema>["body"];
export type updateWishlistType = z.infer<typeof updateWhislistSchema>["body"];

