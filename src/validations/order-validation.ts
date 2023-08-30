import { z } from "zod";





export const updateOrderSchema = z.object({
  body: z.object({
    id: z
      .string({
        required_error: "id is required"
      })
      .min(3)
      .trim(),
    status: z
    .enum(["PENDING", "SUCCESS", "FAILURE"])

})
})

export const createOrderSchema = z.object({
  body: z.object({
    id: z
      .string({
        required_error: "id is required"
      })
      .min(3)
      .trim(),
      total: z
      .number({
        required_error: "total is required"
      }),
    userId: z
      .string({
        required_error: "userId is required"
      })
      .min(3)
      .trim(),
      products: z.array(z.object({
        id: z.string({required_error: "product id list is requiered, [{id: 'id'}, ...] "})
      },{required_error: "product id list is requiered [{id: 'id'}]"})),

})
})



export type createOrderType = z.infer<typeof createOrderSchema>["body"];
export type updateOrderType = z.infer<typeof updateOrderSchema>["body"];

