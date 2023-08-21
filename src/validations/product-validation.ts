import {  z } from "zod";

export const findProductSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: "id is required"
      })
      .min(3)
      .trim(),
    

  
})
})



export type findProductType = z.infer<typeof findProductSchema>["query"];

