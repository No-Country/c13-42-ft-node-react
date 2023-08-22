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

export const updateProductSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: "id is required"
      })
      .min(3, {message: "id must be 3 char long"})
      .trim()
  }),
  body: z.object({
    data: z.object({
      
    })
  })
})

export const deleteProductSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: "id is required"
      })
      .min(3)
      .trim(),
    
})
})

export const CreateProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required"
      })
      .min(3)
      .trim(),

    price: z
      .number({
        required_error: "Price required"
      })
      .min(1),

    brand: z
      .string({
        required_error: "Brand is required"
      })
      .min(1),

    category: z
      .string({
        required_error: "Category is required"
      })
      .min(1),

    gender: z
      .string({
        required_error: "Gender is required!"
      })
      .min(1),

    product_type: z
      .string({
        required_error: "Product Type is required!"
      })
      .min(1),

    sub_title: z
      .string({
        required_error: "Subtitle is required!"
      })
      .min(1),

    images: z.array(z.string({ required_error: "Images are required!"}).url())
})
})



export type findProductType = z.infer<typeof findProductSchema>["query"];
export type CreateProductType = z.infer<typeof CreateProductSchema>["body"];
export type deleteProductType = z.infer<typeof deleteProductSchema>["query"];
export type updateProductType = z.infer<typeof updateProductSchema>["body"];

