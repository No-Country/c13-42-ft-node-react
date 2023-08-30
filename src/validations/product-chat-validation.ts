import { z } from "zod";




export const updateQuestionSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
    data: z
      .object({}),
})
})
export const deleteQuestionSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
})
})
export const deleteAnswerSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
})
})
export const updateAnswerSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: "id is required"
      }),
    data: z
      .object({}),
})
})

export const createQuestionSchema = z.object({
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
      
      content: z
      .string({
        required_error: "content is required"
      })
      .min(1),
    
})
})

export const createAnswerSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: "userId is required"
      })
      .min(3)
      .trim(),
    questionId: z
      .number({
        required_error: "questionId is required"
      }),      
      content: z
      .string({
        required_error: "content is required"
      })
      .min(1),
      
})
})

export type createQuestionType = z.infer<typeof createQuestionSchema>["body"];
export type createAnswerType = z.infer<typeof createAnswerSchema>["body"];

export type updateQuestionType = z.infer<typeof updateQuestionSchema>["body"];
export type updateAnswerType = z.infer<typeof updateAnswerSchema>["body"];


