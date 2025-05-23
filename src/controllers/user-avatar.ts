import { Request, Response } from "express"
import generateAvatar from "../utils/generateAvatar"
import { avatarQuerySchema } from "../validation/avatarQuerySchema"

export const userAvatarController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validationResult = avatarQuerySchema.safeParse(req.query)
    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.issues.map((i) => i.message).join(", ")
      })
      return
    }
    let { name, backgroundColor } = validationResult.data
    if (backgroundColor && !backgroundColor.startsWith("#")) {
      backgroundColor = `#${backgroundColor}`
    }
    const avatarBuffer = await generateAvatar(name, backgroundColor)
    res.set("Content-Type", "image/png").send(avatarBuffer)
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate avatar. Please try again later." })
  }
}
