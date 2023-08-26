import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject, req: NextApiRequest, res: NextApiResponse) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query
      });
    } catch (error) {
      throw error
    }
  };
