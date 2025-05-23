import { Request, Response } from "express"
import generateAvatar, {
  normalizeBackgroundColor
} from "../utils/generateAvatar"
import { avatarQuerySchema } from "../validation/avatarQuerySchema"
import type { ZodIssue } from "zod"

export const userAvatarController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validationResult = avatarQuerySchema.safeParse(req.query)
    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.issues
          .map((i: ZodIssue) => i.message)
          .join(", ")
      })
      return
    }
    let { name, backgroundColor } = validationResult.data
    backgroundColor = normalizeBackgroundColor(backgroundColor)
    const avatarBuffer = await generateAvatar(name, backgroundColor)
    res.set("Content-Type", "image/png").send(avatarBuffer)
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate avatar. Please try again later." })
  }
}
