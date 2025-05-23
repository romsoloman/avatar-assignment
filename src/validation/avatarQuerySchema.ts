import { z } from "zod"

export const avatarQuerySchema = z.object({
  name: z
    .string({
      required_error: "Query parameter 'name' is required and cannot be empty."
    })
    .trim()
    .min(1, {
      message: "Query parameter 'name' is required and cannot be empty."
    }),
  backgroundColor: z
    .string()
    .trim()
    .regex(/^#?[0-9a-fA-F]{6}$/, {
      message:
        "backgroundColor must be a valid 6-character HEX code (with or without #)."
    })
    .optional()
})
