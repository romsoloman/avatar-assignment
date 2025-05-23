import { Router } from "express"
import { userAvatarController } from "../controllers/user-avatar"

const router = Router()

router.get("/", userAvatarController)

export default router
