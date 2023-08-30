import { z } from "zod";



// export const updateWhislistSchema = z.object({
  
//   body: z.object({
//     products: z.array(z.object({
//       id: z.string({required_error: "product id list is requiered, [{id: 'id'}, ...] "})
//     },{required_error: "product id list is requiered [{id: 'id'}]"})),
//     userId: z
//     .string(
//       {required_error: "userId is required"}
//     )

//   })
// })
export const updateReviewSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
    data: z
      .object({}),
    


})
})
export const deleteReviewSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
})
})


export const createReviewSchema = z.object({
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
      title: z
      .string({
        required_error: "title is required"
      })
      .min(1),
      content: z
      .string({
        required_error: "content is required"
      })
      .min(1),
      score: z
      .number({
        required_error: "score is required"
      })
      .min(0),


})
})



export type createReviewType = z.infer<typeof createReviewSchema>["body"];
export type updateReviewType = z.infer<typeof updateReviewSchema>["body"];

